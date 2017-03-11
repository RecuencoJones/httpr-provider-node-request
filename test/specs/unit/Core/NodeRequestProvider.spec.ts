import * as proxyquire from 'proxyquire';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import {HttpRequestSettings, HttpResponse} from 'httpr';

const expect = chai.expect;

chai.use(sinonChai);

describe('NodeRequestProvider', () => {
  const mockResponse: any = {
    response: {
      statusMessage: 'Ok',
      statusCode: 200,
      headers: {},
      responseText: 'Ok'
    },
    body: 'Ok'
  };

  let NodeRequestProvider, provider, requestSpy;

  beforeEach(() => {
    function requestMock(options, cb) {
      cb(mockResponse.error, mockResponse.response, mockResponse.body);
    }

    requestSpy = sinon.spy(requestMock);

    let module = proxyquire('../../../../app/Core/NodeRequestProvider', {
      'request': requestSpy
    });

    provider = new module.NodeRequestProvider();
  });

  it('should perform a get request', () => {
    return provider.request({
      method: 'get',
      url: '/',
      params: {},
      headers: {}
    })
    .then(() => {
      expect(requestSpy).to.have.been.calledWith(sinon.match({
        url: 'http://localhost/',
        method: 'get',
        headers: {},
        body: undefined
      }));
    });
  });

  it('should perform a get request with parameters', () => {
    provider.request({
      method: 'get',
      url: '/',
      params: {
        foo: 'bar'
      },
      headers: {}
    })
    .then(() => {
      expect(requestSpy).to.have.been.calledWith(sinon.match({
        url: 'http://localhost/?foo=bar',
        method: 'get',
        headers: {},
        body: undefined
      }));
    });
  });

  it('should perform a post request with text body', () => {
    return provider.request({
      method: 'post',
      url: '/',
      params: {},
      headers: {
        'content-type': 'text/plain'
      },
      body: 'String'
    })
    .then(() => {
      expect(requestSpy).to.have.been.calledWith(sinon.match({
        url: 'http://localhost/',
        method: 'post',
        headers: {
          'content-type': 'text/plain'
        },
        body: 'String'
      }));
    });
  });

  it('should parse a JSON response', () => {
    const data = {
      foo: 'bar'
    };

    mockResponse.body = JSON.stringify(data);
    mockResponse.response.headers['content-type'] = 'application/json';

    return provider.request({
      method: 'get',
      url: '/',
      params: {},
      headers: {}
    })
    .then((response: HttpResponse) => {
      expect(response.data).to.deep.equal(data);
    });
  });
});
