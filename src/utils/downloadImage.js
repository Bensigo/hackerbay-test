import fs from 'fs'
import request from 'request'

function downloadImage (uri, filename, callback) {
  // download and image base on url and save it
  request.head(uri, (err, res, body) => {
    if (err) {
      console.log(err)
    }
  })
  request(uri).pipe(fs.createWriteStream(filename).on('close', callback))
}
export default downloadImage
