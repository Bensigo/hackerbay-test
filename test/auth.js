import chai from 'chai'
import {describe, it} from 'mocha'
import app from '../src/server'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
const expect = chai.expect

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
        expect(res).to.have.status(200)
        expect(res).to.have.property('token')
        expect(res).to.have.property('activeUser').eql({username: 'test', password: '123test'})
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
        expect(res).to.have.status(200)
        expect(res).to.have.property('data').eql({message: 'username and password require'})
      })
    done()
  })
})
