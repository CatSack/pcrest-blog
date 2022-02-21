import fs from 'fs'

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).send('Only POST requests allowed!')
    }

    const body = req.body
    
    const keys = Object.keys(body)

    if(!(keys.length === 2 && keys[1] == 'content' && keys[0] == 'name')) {
        return res.status(400).send('Invalid request!')
    }

    const files = fs.readdirSync('./posts')
    let name = body.name
    let index = 1

    while(files.includes(name + '.md')) {
        name += '-' + index
        index++
    }

    fs.writeFileSync('./posts/' + name + '.md', body.content)

    try {
        await res.unstable_revalidate('/')
        await res.unstable_revalidate(`/posts/${name}`)
        return res.redirect(302, `/posts/${name}`)
    } catch(err) {
        console.log(err)
        return res.status(500).send('Failed to revalidate page.')
    }
}