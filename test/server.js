import chai from 'chai'
import chaiHttp from 'chai-http'
import {describe, it} from 'mocha'
import app from '../src/server'
chai.should()

chai.use(chaiHttp)

describe('API route', () => {
  it('testing the api route if working', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        if (err) {
          console.log(err)
        }
      })
    done()
  })
  it('testing if the 404 route works', (done) => {
    chai.request(app)
      .get('/test')
      .end((err, res) => {
        res.should.have.status(404)
        if (err) {
          console.log(err)
        }
      })
    done()
  })
})

