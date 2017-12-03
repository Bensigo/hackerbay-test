import chai from 'chai'
import chaiHttp from 'chai-http'
import {describe, it} from 'mocha'

import app from '../src/server'

const expect = chai.expect
chai.use(chaiHttp)

const imageData = {
  name: 'niceDog',
  uri: 'https://www.petinsurance.com/images/VSSimages/consumer/v5/banner_dog_insurance.jpg'
}

describe('Thumbnail generator', () => {
  it('successfully generate thumbnail from image uri', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IjEyM3Rlc3QiLCJpYXQiOjE1MTIyNTExODUsImV4cCI6MTUxMjUxMDM4NX0._0v4urjK17yoF7Bnbuz-ZmzFKI3QDuBhYMcx9SZjrxQ'
    chai.request(app)
      .post('/api/v1/thumbnail')
      .set('x-access-token', token)
      .send(imageData)
      .end((err, req, res) => {
        console.log(err)
        expect(res).to.have.status(200)
        expect(res).to.have.property('message').eql('thumbnail created located in ./thumbnail')
        expect(req).to.have.header('x-access-token')
      })
    done()
  })
  it('fail to generate thumbnail', (done) => {
    chai.request(app)
      .post('/api/v1/thumbnail')
      .send(imageData)
      .end((err, req, res) => {
        if (err) throw err
        expect(res).to.have.status(403)
        expect(res).to.have.property('status').eql(false)
      })
    done()
  })
})
