import chai from 'chai'
import {describe, it} from 'mocha'
import app from '../src/server'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
chai.should()

describe('Authentication /login', () => {
  it('try to auth the a user ', (done) => {
    const user = {
      username: 'test',
      password: '123test'
    }
    chai.request(app)
      .post('api/v1/auth/login')
      .send(user)
      .end((res) => {
        res.body.should.have.status(200)
        res.body.should.have.property('token')
        res.body.should.have.property('activeUser').eql({username: 'test', password: '123test'})
      })
    done()
  })
  it('fail to auth user', (done) => {
    const user = {
      username: 'test'
    }
    chai.request(app)
      .post('api/v1/auth/login')
      .send(user)
      .end((res) => {
        res.body.should.have.status(200)
        res.body.should.have.property('data').eql({message: 'username and password require'})
      })
    done()
  })
})
