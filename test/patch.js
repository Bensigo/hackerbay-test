import chai from 'chai'
import chaiHttp from 'chai-http'
import {describe, it} from 'mocha'
import app from '../src/server'

chai.use(chaiHttp)
const expect = chai.expect

describe(' json Patch', () => {
  it('patch a json object', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IjEyM3Rlc3QiLCJpYXQiOjE1MTIyNTExODUsImV4cCI6MTUxMjUxMDM4NX0._0v4urjK17yoF7Bnbuz-ZmzFKI3QDuBhYMcx9SZjrxQ'
    const data = {
      json: {
        name: 'test',
        age: '20'
      },
      patch: [
        {op: 'replace', path: '/name', value: 'john ivy'}
      ]
    }
    chai.request(app)
      .post('api/v1/patch')
      .set('x-access-token', token)
      .send(data)
      .end((err, req, res) => {
        if (err) throw err
        expect(res).to.have.status(200)
        expect(res).to.have.property('data')
        expect(req).to.have.header('x-access-token')
      })
    done()
  })
})
