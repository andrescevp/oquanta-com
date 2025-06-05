// script to load contentful data into files

import fs from 'fs'
import https from 'https'

import * as contentful from 'contentful'

// load .env
import dotenv from 'dotenv'
dotenv.config({
  path: '.env.local'
})

const client = contentful.createClient({
  space: '088vvx9ymri5',
  environment: 'master', // defaults to 'master' if not set
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

const getEntries = async contentType => {
  const entries = await client.getEntries({
    content_type: contentType
  })
  return entries.items
}

const getEntry = async id => {
  const entry = await client.getEntry(id)
  return entry
}

const getAsset = async id => {
  const asset = await client.getAsset(id)
  return asset
}

const getAssets = async () => {
  const assets = await client.getAssets()
  return assets.items
}

export { getEntries, getEntry, getAsset, getAssets }

const slugToVariableName = slug => {
  return slug.replace(/-/g, '_')
}

// show entry in console
getEntries('blogEntry').then(entries => {
  console.log(entries)
  const slugs = {}
  const images = {}
  Object.entries(entries).forEach(([key, value]) => {
    slugs[value.fields.slug] = value
    // create folder images/blogEntries/${slug}
    const slug = value.fields.slug
    if (!fs.existsSync(`images/blogEntries/${slug}`)) {
      fs.mkdirSync(`images/blogEntries/${slug}`)
    }

    // get asset
    const imageUrl = value.fields.featuredImage?.fields?.file?.url

    if (imageUrl) {
      const fileName = imageUrl.split('/').pop()
      const extension = fileName.split('.').pop()
      const title = value.fields.featuredImage.fields.title
      images[slug] = `${title}.${extension}`
      slugs[value.fields.slug]['featuredImage'] =
        `./../images/blogEntries/${slug}/${title}.${extension}`

      // download imageUrl
      const file = fs.createWriteStream(`images/blogEntries/${slug}/${title}.${extension}`)
      https.get(`https:${imageUrl}`, function (response) {
        response.pipe(file)
        // after download completed close filestream
        file.on('finish', () => {
          file.close()
          console.log('Download Completed')
        })
      })
    }
  })

  // convert to TS
  let TSStr = ''
  // loop throus images
  Object.entries(images).forEach(([key, value]) => {
    TSStr += `import ${slugToVariableName(key)}_featured_image from './../images/blogEntries/${key}/${value}?h=50&format=webp';\n`
  })
  TSStr += '\n'
  TSStr += 'export const images = {'
  Object.entries(images).forEach(([key, value]) => {
    TSStr += `"${key}": ${slugToVariableName(key)}_featured_image,`
  })
  TSStr += '};\n\n'

  // list of slugs
  TSStr += 'export const pages = ' + JSON.stringify(slugs, null, 2) + ';'
  TSStr += '\n\n'
  TSStr += 'export default pages;'

  // write
  fs.writeFile('src/BlogEntries.ts', TSStr, err => {
    if (err) throw err
    console.log('The file has been saved!')
  })
})

getEntries('clientData').then(entries => {
  console.log(entries)
  const slugs = {}
  const images = {}
  Object.entries(entries).forEach(([key, value]) => {
    const slug = value.fields.slug
    slugs[slug] = value
    // get asset
    const logoUrl = value.fields.logo?.fields?.file?.url

    if (logoUrl) {
      const fileName = logoUrl.split('/').pop()
      const extension = fileName.split('.').pop()
      const title = value.fields.logo.fields.title

      images[slug] = `${title}.${extension}`

      slugs[slug]['logo'] = `./../images/clientData/${slug}/${title}.${extension}`
      if (!fs.existsSync(`images/clientData/${slug}`)) {
        fs.mkdirSync(`images/clientData/${slug}`)
      }

      // download imageUrl
      const file = fs.createWriteStream(`images/clientData/${slug}/${title}.${extension}`)
      https.get(`https:${logoUrl}`, function (response) {
        response.pipe(file)
        // after download completed close filestream
        file.on('finish', () => {
          file.close()
          console.log('Download Completed')
        })
      })
    }
  })

  // convert to TS
  let TSStr = ''
  // loop throus images
  Object.entries(images).forEach(([key, value]) => {
    TSStr += `import ${slugToVariableName(key)}_logo from './../images/clientData/${key}/${value}?h=250&format=webp';\n`
  })
  // list of slugs
  TSStr += 'export const clientData = ' + JSON.stringify(slugs, null, 2) + ';'
  TSStr += '\n\n'
  TSStr += 'export const images = {'
  Object.entries(images).forEach(([key, value]) => {
    TSStr += `"${key}": ${slugToVariableName(key)}_logo,`
  })
  TSStr += '};\n\n'
  TSStr += 'export default clientData;'

  // write
  fs.writeFile('src/ClientData.ts', TSStr, err => {
    if (err) throw err
    console.log('The file has been saved!')
  })
})

getEntries('faqEntry').then(entries => {
  console.log(entries)
  const slugs = {}
  Object.entries(entries).forEach(([key, value]) => {
    slugs[value.fields.slug] = value
  })

  // list of slugs
  let TSStr = 'export const faqEntries = ' + JSON.stringify(slugs, null, 2) + ';'
  TSStr += '\n\n'
  TSStr += 'export default faqEntries;'

  // write
  fs.writeFile('src/FaqEntries.ts', TSStr, err => {
    if (err) throw err
    console.log('The file has been saved!')
  })
})

getEntries('clientTestimony').then(entries => {
  console.log(entries)
  const slugs = {}
  Object.entries(entries).forEach(([key, value]) => {
    slugs[value.fields.slug] = value
  })

  // list of slugs
  let TSStr = 'export const clientTestimonies = ' + JSON.stringify(slugs, null, 2) + ';'
  TSStr += '\n\n'
  TSStr += 'export default clientTestimonies;'

  // write
  fs.writeFile('src/ClientTestimonies.ts', TSStr, err => {
    if (err) throw err
    console.log('The file has been saved!')
  })
})

getEntries('pressPosts').then(entries => {
  console.log(entries)
  const slugs = {}
  const images = {}
  Object.entries(entries).forEach(([key, value]) => {
    slugs[value.fields.slug] = value

    // create folder images/pressPosts/${slug}
    const slug = value.fields.slug
    if (!fs.existsSync(`images/pressPosts/${slug}`)) {
      fs.mkdirSync(`images/pressPosts/${slug}`)
    }

    // get asset
    const imageUrl = value.fields.image?.fields?.file?.url

    if (imageUrl) {
      const fileName = imageUrl.split('/').pop()
      const extension = fileName.split('.').pop()
      const title = value.fields.image.fields.title
      images[slug] = `${title}.${extension}`
      slugs[value.fields.slug]['image'] = `./../images/pressPosts/${slug}/${title}.${extension}`

      // download imageUrl
      const file = fs.createWriteStream(`images/pressPosts/${slug}/${title}.${extension}`)
      https.get(`https:${imageUrl}`, function (response) {
        response.pipe(file)
        // after download completed close filestream
        file.on('finish', () => {
          file.close()
          console.log('Download Completed')
        })
      })
    }
  })

  let TSStr = ''
  // loop throus images
  Object.entries(images).forEach(([key, value]) => {
    TSStr += `import ${slugToVariableName(key)}_image from './../images/pressPosts/${key}/${value}?h=250&format=webp';\n`
  })

  TSStr += '\n'

  // list of slugs
  TSStr += 'export const pressPosts = ' + JSON.stringify(slugs, null, 2) + ';'
  TSStr += '\n\n'
  TSStr += 'export const images = {'
  Object.entries(images).forEach(([key, value]) => {
    TSStr += `"${key}": ${slugToVariableName(key)}_image,`
  })
  TSStr += '};\n\n'
  TSStr += 'export default pressPosts;'

  // write
  fs.writeFile('src/PressPosts.ts', TSStr, err => {
    if (err) throw err
    console.log('The file has been saved!')
  })
})

// get entries localBusiness with {name, locationLink, description, file} similiar to blogEntry

getEntries('localBusiness').then(entries => {
  console.log(entries)
  const slugs = {}
  const images = {}
  Object.entries(entries).forEach(([key, value]) => {
    slugs[value.fields.name] = value
    // create folder images/localBusiness/${slug}
    // get asset
    const imageUrl = value.fields.image?.fields?.file?.url

    if (imageUrl) {
      const fileName = imageUrl.split('/').pop()
      const name = fileName.split('.')[0]
      if (!fs.existsSync(`images/localBusiness/${name}`)) {
        fs.mkdirSync(`images/localBusiness/${name}`)
      }
      images[name] = fileName
      slugs[value.fields.name]['image'] = `./../images/localBusiness/${name}/${fileName}`

      // download imageUrl
      const file = fs.createWriteStream(`images/localBusiness/${name}/${fileName}`)
      https.get(`https:${imageUrl}`, function (response) {
        response.pipe(file)
        // after download completed close filestream
        file.on('finish', () => {
          file.close()
          console.log('Download Completed')
        })
      })
    }
  })
  // convert to TS
  let TSStr = ''
  // loop throus images
  Object.entries(images).forEach(([key, value]) => {
    TSStr += `import ${slugToVariableName(key)}_file from './../images/localBusiness/${key}/${value}?h=50&format=webp';\n`
  })
  TSStr += '\n'
  TSStr += 'export const images = {'
  Object.entries(images).forEach(([key, value]) => {
    TSStr += `"${key}": ${slugToVariableName(key)}_file,`
  })
  TSStr += '};\n\n'
  // list of slugs
  TSStr += 'export const localBusiness = ' + JSON.stringify(slugs, null, 2) + ';'
  TSStr += '\n\n'
  TSStr += 'export default localBusiness;'
  // write
  fs.writeFile('src/LocalBusinesses.ts', TSStr, err => {
    if (err) throw err
    console.log('The file has been saved!')
  })
})
