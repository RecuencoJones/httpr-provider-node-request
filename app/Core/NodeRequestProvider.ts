import * as _ from 'lodash';
import * as request from 'request';
import {
  HttprProvider,
  HttpRequestSettings,
  HttpResponse,
  MediaTypes,
  HttpHeaders,
  urlEncode
} from 'httpr';

/**
 * Httpr provider implemented with request module for usage in node environments.
 */
export class NodeRequestProvider extends HttprProvider {
  /**
   * @inheritDoc
   */
  public request(settings: HttpRequestSettings): Promise<HttpResponse> {
    return new Promise((resolve, reject) => {
      const queryParams: string = urlEncode(settings.params);

      let url = queryParams ? `${settings.url}?${queryParams}` : settings.url;

      if (_.startsWith(url, '/')) {
        url = `http://localhost${url}`;
      }

      request({
        url,
        method: settings.method,
        headers: settings.headers,
        body: settings.body
      }, (error, response, body) => {
        const _response: HttpResponse = {
            status: response.statusCode,
            statusText: response.statusMessage,
            headers: response.headers,
            responseText: body
          },
          contentType = _response.headers[HttpHeaders.CONTENT_TYPE];

        if (error) {
          reject(_response);
        } else {
          if (contentType && contentType.indexOf(MediaTypes.APPLICATION_JSON) > -1) {
            _response.data = JSON.parse(body);
          } else {
            _response.data = body;
          }

          resolve(_response);
        }
      });
    });
  }
}
