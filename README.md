bash
command
find /tmp/inputs/falcon -type f -name "*.py" | head -50

output
/tmp/inputs/falcon/__init__.py
/tmp/inputs/falcon/forwarded.py
/tmp/inputs/falcon/typing.py
/tmp/inputs/falcon/http_error.py
/tmp/inputs/falcon/_typing.py
/tmp/inputs/falcon/middleware.py
/tmp/inputs/falcon/hooks.py
/tmp/inputs/falcon/uri.py
/tmp/inputs/falcon/http_status.py
/tmp/inputs/falcon/constants.py
/tmp/inputs/falcon/errors.py
/tmp/inputs/falcon/version.py
/tmp/inputs/falcon/inspect.py
/tmp/inputs/falcon/app.py
/tmp/inputs/falcon/redirects.py
/tmp/inputs/falcon/response.py
/tmp/inputs/falcon/status_codes.py
/tmp/inputs/falcon/asgi_spec.py
/tmp/inputs/falcon/request_helpers.py
/tmp/inputs/falcon/app_helpers.py
/tmp/inputs/falcon/stream.py
/tmp/inputs/falcon/responders.py
/tmp/inputs/falcon/response_helpers.py
/tmp/inputs/falcon/request.py
/tmp/inputs/falcon/testing/__init__.py
/tmp/inputs/falcon/testing/client.py
/tmp/inputs/falcon/testing/srmock.py
/tmp/inputs/falcon/testing/test_case.py
/tmp/inputs/falcon/testing/helpers.py
/tmp/inputs/falcon/testing/resource.py
/tmp/inputs/falcon/media/__init__.py
/tmp/inputs/falcon/media/json.py
/tmp/inputs/falcon/media/handlers.py
/tmp/inputs/falcon/media/urlencoded.py
/tmp/inputs/falcon/media/multipart.py
/tmp/inputs/falcon/media/msgpack.py
/tmp/inputs/falcon/media/base.py
/tmp/inputs/falcon/media/validators/__init__.py
/tmp/inputs/falcon/media/validators/jsonschema.py
/tmp/inputs/falcon/bench/__init__.py
/tmp/inputs/falcon/bench/create.py
/tmp/inputs/falcon/bench/bench.py
/tmp/inputs/falcon/bench/nuts/__init__.py
/tmp/inputs/falcon/bench/nuts/setup.py
/tmp/inputs/falcon/bench/nuts/config.py
/tmp/inputs/falcon/bench/nuts/nuts/__init__.py
/tmp/inputs/falcon/bench/nuts/nuts/app.py
/tmp/inputs/falcon/bench/nuts/nuts/controllers/__init__.py
/tmp/inputs/falcon/bench/nuts/nuts/controllers/root.py
/tmp/inputs/falcon/bench/nuts/nuts/tests/__init__.py

str_replace_based_edit_tool
command
view
path
/tmp/inputs/falcon

output
1.2M	/tmp/inputs/falcon
22K	/tmp/inputs/falcon/__init__.py
12K	/tmp/inputs/falcon/_typing.py
56K	/tmp/inputs/falcon/app.py
16K	/tmp/inputs/falcon/app_helpers.py
198K	/tmp/inputs/falcon/asgi
1.5K	/tmp/inputs/falcon/asgi/__init__.py
4.0K	/tmp/inputs/falcon/asgi/_asgi_helpers.py
1.5K	/tmp/inputs/falcon/asgi/_request_helpers.py
61K	/tmp/inputs/falcon/asgi/app.py
11K	/tmp/inputs/falcon/asgi/multipart.py
13K	/tmp/inputs/falcon/asgi/reader.py
36K	/tmp/inputs/falcon/asgi/request.py
16K	/tmp/inputs/falcon/asgi/response.py
18K	/tmp/inputs/falcon/asgi/stream.py
6.5K	/tmp/inputs/falcon/asgi/structures.py
31K	/tmp/inputs/falcon/asgi/ws.py
2.5K	/tmp/inputs/falcon/asgi_spec.py
76K	/tmp/inputs/falcon/bench
512	/tmp/inputs/falcon/bench/__init__.py
12K	/tmp/inputs/falcon/bench/bench.py
3.5K	/tmp/inputs/falcon/bench/create.py
8.0K	/tmp/inputs/falcon/bench/dj
46K	/tmp/inputs/falcon/bench/nuts
7.0K	/tmp/inputs/falcon/bench/queues
4.5K	/tmp/inputs/falcon/cmd
0	/tmp/inputs/falcon/cmd/__init__.py
1.0K	/tmp/inputs/falcon/cmd/bench.py
3.5K	/tmp/inputs/falcon/cmd/inspect_app.py
6.5K	/tmp/inputs/falcon/constants.py
31K	/tmp/inputs/falcon/cyutil
0	/tmp/inputs/falcon/cyutil/__init__.py
1.0K	/tmp/inputs/falcon/cyutil/misc.pyx
15K	/tmp/inputs/falcon/cyutil/reader.pyx
15K	/tmp/inputs/falcon/cyutil/uri.pyx
106K	/tmp/inputs/falcon/errors.py
6.5K	/tmp/inputs/falcon/forwarded.py
15K	/tmp/inputs/falcon/hooks.py
9.0K	/tmp/inputs/falcon/http_error.py
2.5K	/tmp/inputs/falcon/http_status.py
28K	/tmp/inputs/falcon/inspect.py
67K	/tmp/inputs/falcon/media
1.0K	/tmp/inputs/falcon/media/__init__.py
9.5K	/tmp/inputs/falcon/media/base.py
7.5K	/tmp/inputs/falcon/media/handlers.py
12K	/tmp/inputs/falcon/media/json.py
4.0K	/tmp/inputs/falcon/media/msgpack.py
24K	/tmp/inputs/falcon/media/multipart.py
3.5K	/tmp/inputs/falcon/media/urlencoded.py
6.0K	/tmp/inputs/falcon/media/validators
7.5K	/tmp/inputs/falcon/middleware.py
0	/tmp/inputs/falcon/py.typed
5.5K	/tmp/inputs/falcon/redirects.py
93K	/tmp/inputs/falcon/request.py
6.5K	/tmp/inputs/falcon/request_helpers.py
4.0K	/tmp/inputs/falcon/responders.py
56K	/tmp/inputs/falcon/response.py
5.0K	/tmp/inputs/falcon/response_helpers.py
75K	/tmp/inputs/falcon/routing
2.0K	/tmp/inputs/falcon/routing/__init__.py
47K	/tmp/inputs/falcon/routing/compiled.py
8.0K	/tmp/inputs/falcon/routing/converters.py
13K	/tmp/inputs/falcon/routing/static.py
5.0K	/tmp/inputs/falcon/routing/util.py
13K	/tmp/inputs/falcon/status_codes.py
6.0K	/tmp/inputs/falcon/stream.py
176K	/tmp/inputs/falcon/testing
7.0K	/tmp/inputs/falcon/testing/__init__.py
97K	/tmp/inputs/falcon/testing/client.py
57K	/tmp/inputs/falcon/testing/helpers.py
10K	/tmp/inputs/falcon/testing/resource.py
2.5K	/tmp/inputs/falcon/testing/srmock.py
3.0K	/tmp/inputs/falcon/testing/test_case.py
2.0K	/tmp/inputs/falcon/typing.py
1.0K	/tmp/inputs/falcon/uri.py
97K	/tmp/inputs/falcon/util
3.5K	/tmp/inputs/falcon/util/__init__.py
4.5K	/tmp/inputs/falcon/util/deprecation.py
12K	/tmp/inputs/falcon/util/mediatypes.py
18K	/tmp/inputs/falcon/util/misc.py
15K	/tmp/inputs/falcon/util/reader.py
12K	/tmp/inputs/falcon/util/structures.py
11K	/tmp/inputs/falcon/util/sync.py
2.0K	/tmp/inputs/falcon/util/time.py
21K	/tmp/inputs/falcon/util/uri.py
1.0K	/tmp/inputs/falcon/version.py

bash
command
cat /tmp/inputs/falcon/middleware.py

output
from __future__ import annotations

from collections.abc import Iterable
from typing import TYPE_CHECKING

from ._typing import UniversalMiddlewareWithProcessResponse

if TYPE_CHECKING:
from .asgi.request import Request as AsgiRequest
from .asgi.response import Response as AsgiResponse
from .request import Request
from .response import Response


class CORSMiddleware(UniversalMiddlewareWithProcessResponse):
"""CORS Middleware.

This middleware provides a simple out-of-the box CORS policy, including handling
of preflighted requests from the browser.

See also:

* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
* https://www.w3.org/TR/cors/#resource-processing-model

Note:
Falcon will automatically add OPTIONS responders if they are missing from the
responder instances added to the routes. When providing a custom ``on_options``
method, the ``Allow`` headers in the response should be set to the allowed
method values. If the ``Allow`` header is missing from the response,
this middleware will deny the preflight request.

This is also valid when using a sink function.

Keyword Arguments:
allow_origins (Union[str, Iterable[str]]): List of origins to allow (case
sensitive). The string ``'*'`` acts as a wildcard, matching every origin.
(default ``'*'``).
expose_headers (Optional[Union[str, Iterable[str]]]): List of additional
response headers to expose via the ``Access-Control-Expose-Headers``
header. These headers are in addition to the CORS-safelisted ones:
``Cache-Control``, ``Content-Language``, ``Content-Length``,
``Content-Type``, ``Expires``, ``Last-Modified``, ``Pragma``.
(default ``None``).

See also:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
allow_credentials (Optional[Union[str, Iterable[str]]]): List of origins
(case sensitive) for which to allow credentials via the
``Access-Control-Allow-Credentials`` header.
The string ``'*'`` acts as a wildcard, matching every allowed origin,
while ``None`` disallows all origins. This parameter takes effect only
if the origin is allowed by the ``allow_origins`` argument.
(default ``None``).
allow_private_network (bool):
If ``True``, the server includes the
``Access-Control-Allow-Private-Network`` header in responses to
CORS preflight (OPTIONS) requests. This indicates that the resource is
willing to respond to requests from less-public IP address spaces
(e.g., from public site to private device).
(default ``False``).

See also:
https://wicg.github.io/private-network-access/#private-network-request-heading
"""

def __init__(
self,
allow_origins: str | Iterable[str] = '*',
expose_headers: str | Iterable[str] | None = None,
allow_credentials: str | Iterable[str] | None = None,
allow_private_network: bool = False,
):
if allow_origins == '*':
self.allow_origins = allow_origins
else:
if isinstance(allow_origins, str):
allow_origins = [allow_origins]
self.allow_origins = frozenset(allow_origins)
if '*' in self.allow_origins:
raise ValueError(
'The wildcard string "*" may only be passed to allow_origins as a '
'string literal, not inside an iterable.'
)

if expose_headers is not None and not isinstance(expose_headers, str):
expose_headers = ', '.join(expose_headers)
self.expose_headers = expose_headers

if allow_credentials is None:
allow_credentials = frozenset()
elif allow_credentials != '*':
if isinstance(allow_credentials, str):
allow_credentials = [allow_credentials]
allow_credentials = frozenset(allow_credentials)
if '*' in allow_credentials:
raise ValueError(
'The wildcard string "*" may only be passed to allow_credentials '
'as a string literal, not inside an iterable.'
)
self.allow_credentials = allow_credentials
self.allow_private_network = allow_private_network

def process_response(
self, req: Request, resp: Response, resource: object, req_succeeded: bool
) -> None:
"""Implement the CORS policy for all routes.

This middleware provides a simple out-of-the box CORS policy,
including handling of preflighted requests from the browser.

See also: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

See also: https://www.w3.org/TR/cors/#resource-processing-model
"""

origin = req.get_header('Origin')
if origin is None:
return

if self.allow_origins != '*' and origin not in self.allow_origins:
return

if resp.get_header('Access-Control-Allow-Origin') is None:
set_origin = '*' if self.allow_origins == '*' else origin
if self.allow_credentials == '*' or origin in self.allow_credentials:
set_origin = origin
resp.set_header('Access-Control-Allow-Credentials', 'true')
resp.set_header('Access-Control-Allow-Origin', set_origin)

if self.expose_headers:
resp.set_header('Access-Control-Expose-Headers', self.expose_headers)

if (
req_succeeded
and req.method == 'OPTIONS'
and req.get_header('Access-Control-Request-Method')
):
# NOTE(kgriffs): This is a CORS preflight request. Patch the
#   response accordingly.

allow = resp.get_header('Allow')
resp.delete_header('Allow')

allow_headers = req.get_header(
'Access-Control-Request-Headers', default='*'
)

if allow is None:
# there is no allow set, remove all access control headers
resp.delete_header('Access-Control-Allow-Methods')
resp.delete_header('Access-Control-Allow-Headers')
resp.delete_header('Access-Control-Max-Age')
resp.delete_header('Access-Control-Expose-Headers')
resp.delete_header('Access-Control-Allow-Origin')
else:
resp.set_header('Access-Control-Allow-Methods', allow)
resp.set_header('Access-Control-Allow-Headers', allow_headers)
resp.set_header('Access-Control-Max-Age', '86400')  # 24 hours

if self.allow_private_network and (
req.get_header('Access-Control-Request-Private-Network') == 'true'
):
resp.set_header('Access-Control-Allow-Private-Network', 'true')

async def process_response_async(
self,
req: AsgiRequest,
resp: AsgiResponse,
resource: object,
req_succeeded: bool,
) -> None:
self.process_response(req, resp, resource, req_succeeded)

bash
command
cat /tmp/inputs/falcon/__init__.py

output
# Copyright 2013 by Rackspace Hosting, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Primary package for Falcon, the minimalist web API framework.

Falcon is a minimalist web API framework for building speedy web APIs and app
backends. The `falcon` package can be used to directly access most of
the framework's classes, functions, and variables::

import falcon

app = falcon.App()
"""

import logging as _logging

__all__ = (
# API interface
'API',
'App',
'after',
'before',
'BoundedStream',
'CORSMiddleware',
'HTTPError',
'HTTPStatus',
'HTTPFound',
'HTTPMovedPermanently',
'HTTPPermanentRedirect',
'HTTPSeeOther',
'HTTPTemporaryRedirect',
'Forwarded',
'Request',
'RequestOptions',
'Response',
'ResponseOptions',
# Public constants
'HTTP_METHODS',
'WEBDAV_METHODS',
'COMBINED_METHODS',
'DEFAULT_MEDIA_TYPE',
'MEDIA_BMP',
'MEDIA_CSV',
'MEDIA_GIF',
'MEDIA_HTML',
'MEDIA_JPEG',
'MEDIA_JS',
'MEDIA_JSON',
'MEDIA_MSGPACK',
'MEDIA_MULTIPART',
'MEDIA_PARQUET',
'MEDIA_PNG',
'MEDIA_TEXT',
'MEDIA_URLENCODED',
'MEDIA_XML',
'MEDIA_YAML',
'SINGLETON_HEADERS',
'WebSocketPayloadType',
# Utilities
'async_to_sync',
'BufferedReader',
'CaseInsensitiveDict',
'code_to_http_status',
'Context',
'create_task',
'deprecated',
'dt_to_http',
'ETag',
'get_argnames',
'get_bound_method',
'get_running_loop',
'http_cookies',
'http_date_to_dt',
'http_now',
'http_status_to_code',
'IS_64_BITS',
'is_python_func',
'mediatypes',
'misc',
'parse_header',
'reader',
'runs_sync',
'secure_filename',
'structures',
'sync',
'sync_to_async',
'time',
'TimezoneGMT',
'to_query_str',
'uri',
'wrap_sync_to_async',
'wrap_sync_to_async_unsafe',
# Error classes
'CompatibilityError',
'DelimiterError',
'HeaderNotSupported',
'HTTPBadGateway',
'HTTPBadRequest',
'HTTPConflict',
'HTTPFailedDependency',
'HTTPForbidden',
'HTTPGatewayTimeout',
'HTTPGone',
'HTTPInsufficientStorage',
'HTTPInternalServerError',
'HTTPInvalidHeader',
'HTTPInvalidParam',
'HTTPLengthRequired',
'HTTPLocked',
'HTTPLoopDetected',
'HTTPMethodNotAllowed',
'HTTPMissingHeader',
'HTTPMissingParam',
'HTTPNetworkAuthenticationRequired',
'HTTPNotAcceptable',
'HTTPNotFound',
'HTTPNotImplemented',
'HTTPContentTooLarge',
'HTTPPayloadTooLarge',
'HTTPPreconditionFailed',
'HTTPPreconditionRequired',
'HTTPRangeNotSatisfiable',
'HTTPRequestHeaderFieldsTooLarge',
'HTTPRouteNotFound',
'HTTPServiceUnavailable',
'HTTPTooManyRequests',
'HTTPUnauthorized',
'HTTPUnavailableForLegalReasons',
'HTTPUnprocessableEntity',
'HTTPUnsupportedMediaType',
'HTTPUriTooLong',
'HTTPVersionNotSupported',
'InvalidMediaRange',
'InvalidMediaType',
'MediaMalformedError',
'MediaNotFoundError',
'MediaValidationError',
'MultipartParseError',
'OperationNotAllowed',
'PayloadTypeError',
'UnsupportedError',
'UnsupportedScopeError',
'WebSocketDisconnected',
'WebSocketHandlerNotFound',
'WebSocketPathNotFound',
'WebSocketServerError',
# HTTP status codes
'HTTP_100',
'HTTP_101',
'HTTP_102',
'HTTP_103',
'HTTP_200',
'HTTP_201',
'HTTP_202',
'HTTP_203',
'HTTP_204',
'HTTP_205',
'HTTP_206',
'HTTP_207',
'HTTP_208',
'HTTP_226',
'HTTP_300',
'HTTP_301',
'HTTP_302',
'HTTP_303',
'HTTP_304',
'HTTP_305',
'HTTP_307',
'HTTP_308',
'HTTP_400',
'HTTP_401',
'HTTP_402',
'HTTP_403',
'HTTP_404',
'HTTP_405',
'HTTP_406',
'HTTP_407',
'HTTP_408',
'HTTP_409',
'HTTP_410',
'HTTP_411',
'HTTP_412',
'HTTP_413',
'HTTP_414',
'HTTP_415',
'HTTP_416',
'HTTP_417',
'HTTP_418',
'HTTP_421',
'HTTP_422',
'HTTP_423',
'HTTP_424',
'HTTP_425',
'HTTP_426',
'HTTP_428',
'HTTP_429',
'HTTP_431',
'HTTP_451',
'HTTP_500',
'HTTP_501',
'HTTP_502',
'HTTP_503',
'HTTP_504',
'HTTP_505',
'HTTP_506',
'HTTP_507',
'HTTP_508',
'HTTP_510',
'HTTP_511',
'HTTP_701',
'HTTP_702',
'HTTP_703',
'HTTP_710',
'HTTP_711',
'HTTP_712',
'HTTP_719',
'HTTP_720',
'HTTP_721',
'HTTP_722',
'HTTP_723',
'HTTP_724',
'HTTP_725',
'HTTP_726',
'HTTP_727',
'HTTP_740',
'HTTP_741',
'HTTP_742',
'HTTP_743',
'HTTP_744',
'HTTP_745',
'HTTP_748',
'HTTP_749',
'HTTP_750',
'HTTP_753',
'HTTP_754',
'HTTP_755',
'HTTP_759',
'HTTP_771',
'HTTP_772',
'HTTP_773',
'HTTP_774',
'HTTP_776',
'HTTP_777',
'HTTP_778',
'HTTP_779',
'HTTP_780',
'HTTP_781',
'HTTP_782',
'HTTP_783',
'HTTP_784',
'HTTP_785',
'HTTP_786',
'HTTP_791',
'HTTP_792',
'HTTP_797',
'HTTP_799',
'HTTP_ACCEPTED',
'HTTP_ALREADY_REPORTED',
'HTTP_BAD_GATEWAY',
'HTTP_BAD_REQUEST',
'HTTP_CONFLICT',
'HTTP_CONTENT_TOO_LARGE',
'HTTP_CONTINUE',
'HTTP_CREATED',
'HTTP_EARLY_HINTS',
'HTTP_EXPECTATION_FAILED',
'HTTP_FAILED_DEPENDENCY',
'HTTP_FORBIDDEN',
'HTTP_FOUND',
'HTTP_GATEWAY_TIMEOUT',
'HTTP_GONE',
'HTTP_HTTP_VERSION_NOT_SUPPORTED',
'HTTP_IM_A_TEAPOT',
'HTTP_IM_USED',
'HTTP_INSUFFICIENT_STORAGE',
'HTTP_INTERNAL_SERVER_ERROR',
'HTTP_LENGTH_REQUIRED',
'HTTP_LOCKED',
'HTTP_LOOP_DETECTED',
'HTTP_METHOD_NOT_ALLOWED',
'HTTP_MISDIRECTED_REQUEST',
'HTTP_MOVED_PERMANENTLY',
'HTTP_MULTIPLE_CHOICES',
'HTTP_MULTI_STATUS',
'HTTP_NETWORK_AUTHENTICATION_REQUIRED',
'HTTP_NON_AUTHORITATIVE_INFORMATION',
'HTTP_NOT_ACCEPTABLE',
'HTTP_NOT_EXTENDED',
'HTTP_NOT_FOUND',
'HTTP_NOT_IMPLEMENTED',
'HTTP_NOT_MODIFIED',
'HTTP_NO_CONTENT',
'HTTP_OK',
'HTTP_PARTIAL_CONTENT',
'HTTP_PAYMENT_REQUIRED',
'HTTP_PERMANENT_REDIRECT',
'HTTP_PRECONDITION_FAILED',
'HTTP_PRECONDITION_REQUIRED',
'HTTP_PROCESSING',
'HTTP_PROXY_AUTHENTICATION_REQUIRED',
'HTTP_REQUESTED_RANGE_NOT_SATISFIABLE',
'HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE',
'HTTP_REQUEST_TIMEOUT',
'HTTP_REQUEST_URI_TOO_LONG',
'HTTP_RESET_CONTENT',
'HTTP_SEE_OTHER',
'HTTP_SERVICE_UNAVAILABLE',
'HTTP_SWITCHING_PROTOCOLS',
'HTTP_TEMPORARY_REDIRECT',
'HTTP_TOO_EARLY',
'HTTP_TOO_MANY_REQUESTS',
'HTTP_UNAUTHORIZED',
'HTTP_UNAVAILABLE_FOR_LEGAL_REASONS',
'HTTP_UNPROCESSABLE_ENTITY',
'HTTP_UNSUPPORTED_MEDIA_TYPE',
'HTTP_UPGRADE_REQUIRED',
'HTTP_USE_PROXY',
'HTTP_VARIANT_ALSO_NEGOTIATES',
)

# NOTE(kgriffs,vytas): Hoist classes and functions into the falcon namespace.
#   Please explicitly list ALL exports.
from falcon.app import API
from falcon.app import App
from falcon.constants import ASGI_SUPPORTED  # NOQA: F401
from falcon.constants import COMBINED_METHODS
from falcon.constants import DEFAULT_MEDIA_TYPE
from falcon.constants import HTTP_METHODS
from falcon.constants import MEDIA_BMP
from falcon.constants import MEDIA_CSV
from falcon.constants import MEDIA_GIF
from falcon.constants import MEDIA_HTML
from falcon.constants import MEDIA_JPEG
from falcon.constants import MEDIA_JS
from falcon.constants import MEDIA_JSON
from falcon.constants import MEDIA_MSGPACK
from falcon.constants import MEDIA_MULTIPART
from falcon.constants import MEDIA_PARQUET
from falcon.constants import MEDIA_PNG
from falcon.constants import MEDIA_TEXT
from falcon.constants import MEDIA_URLENCODED
from falcon.constants import MEDIA_XML
from falcon.constants import MEDIA_YAML
from falcon.constants import PYTHON_VERSION  # NOQA: F401
from falcon.constants import SINGLETON_HEADERS
from falcon.constants import WEBDAV_METHODS
from falcon.constants import WebSocketPayloadType
from falcon.errors import CompatibilityError
from falcon.errors import DelimiterError
from falcon.errors import HeaderNotSupported
from falcon.errors import HTTPBadGateway
from falcon.errors import HTTPBadRequest
from falcon.errors import HTTPConflict
from falcon.errors import HTTPContentTooLarge
from falcon.errors import HTTPFailedDependency
from falcon.errors import HTTPForbidden
from falcon.errors import HTTPGatewayTimeout
from falcon.errors import HTTPGone
from falcon.errors import HTTPInsufficientStorage
from falcon.errors import HTTPInternalServerError
from falcon.errors import HTTPInvalidHeader
from falcon.errors import HTTPInvalidParam
from falcon.errors import HTTPLengthRequired
from falcon.errors import HTTPLocked
from falcon.errors import HTTPLoopDetected
from falcon.errors import HTTPMethodNotAllowed
from falcon.errors import HTTPMissingHeader
from falcon.errors import HTTPMissingParam
from falcon.errors import HTTPNetworkAuthenticationRequired
from falcon.errors import HTTPNotAcceptable
from falcon.errors import HTTPNotFound
from falcon.errors import HTTPNotImplemented
from falcon.errors import HTTPPayloadTooLarge
from falcon.errors import HTTPPreconditionFailed
from falcon.errors import HTTPPreconditionRequired
from falcon.errors import HTTPRangeNotSatisfiable
from falcon.errors import HTTPRequestHeaderFieldsTooLarge
from falcon.errors import HTTPRouteNotFound
from falcon.errors import HTTPServiceUnavailable
from falcon.errors import HTTPTooManyRequests
from falcon.errors import HTTPUnauthorized
from falcon.errors import HTTPUnavailableForLegalReasons
from falcon.errors import HTTPUnprocessableEntity
from falcon.errors import HTTPUnsupportedMediaType
from falcon.errors import HTTPUriTooLong
from falcon.errors import HTTPVersionNotSupported
from falcon.errors import InvalidMediaRange
from falcon.errors import InvalidMediaType
from falcon.errors import MediaMalformedError
from falcon.errors import MediaNotFoundError
from falcon.errors import MediaValidationError
from falcon.errors import MultipartParseError
from falcon.errors import OperationNotAllowed
from falcon.errors import PayloadTypeError
from falcon.errors import UnsupportedError
from falcon.errors import UnsupportedScopeError
from falcon.errors import WebSocketDisconnected
from falcon.errors import WebSocketHandlerNotFound
from falcon.errors import WebSocketPathNotFound
from falcon.errors import WebSocketServerError
from falcon.hooks import after
from falcon.hooks import before
from falcon.http_error import HTTPError
from falcon.http_status import HTTPStatus
from falcon.middleware import CORSMiddleware
from falcon.redirects import HTTPFound
from falcon.redirects import HTTPMovedPermanently
from falcon.redirects import HTTPPermanentRedirect
from falcon.redirects import HTTPSeeOther
from falcon.redirects import HTTPTemporaryRedirect
from falcon.request import Forwarded
from falcon.request import Request
from falcon.request import RequestOptions
from falcon.response import Response
from falcon.response import ResponseOptions

# Hoist HTTP status codes.
from falcon.status_codes import HTTP_100
from falcon.status_codes import HTTP_101
from falcon.status_codes import HTTP_102
from falcon.status_codes import HTTP_103
from falcon.status_codes import HTTP_200
from falcon.status_codes import HTTP_201
from falcon.status_codes import HTTP_202
from falcon.status_codes import HTTP_203
from falcon.status_codes import HTTP_204
from falcon.status_codes import HTTP_205
from falcon.status_codes import HTTP_206
from falcon.status_codes import HTTP_207
from falcon.status_codes import HTTP_208
from falcon.status_codes import HTTP_226
from falcon.status_codes import HTTP_300
from falcon.status_codes import HTTP_301
from falcon.status_codes import HTTP_302
from falcon.status_codes import HTTP_303
from falcon.status_codes import HTTP_304
from falcon.status_codes import HTTP_305
from falcon.status_codes import HTTP_307
from falcon.status_codes import HTTP_308
from falcon.status_codes import HTTP_400
from falcon.status_codes import HTTP_401
from falcon.status_codes import HTTP_402
from falcon.status_codes import HTTP_403
from falcon.status_codes import HTTP_404
from falcon.status_codes import HTTP_405
from falcon.status_codes import HTTP_406
from falcon.status_codes import HTTP_407
from falcon.status_codes import HTTP_408
from falcon.status_codes import HTTP_409
from falcon.status_codes import HTTP_410
from falcon.status_codes import HTTP_411
from falcon.status_codes import HTTP_412
from falcon.status_codes import HTTP_413
from falcon.status_codes import HTTP_414
from falcon.status_codes import HTTP_415
from falcon.status_codes import HTTP_416
from falcon.status_codes import HTTP_417
from falcon.status_codes import HTTP_418
from falcon.status_codes import HTTP_421
from falcon.status_codes import HTTP_422
from falcon.status_codes import HTTP_423
from falcon.status_codes import HTTP_424
from falcon.status_codes import HTTP_425
from falcon.status_codes import HTTP_426
from falcon.status_codes import HTTP_428
from falcon.status_codes import HTTP_429
from falcon.status_codes import HTTP_431
from falcon.status_codes import HTTP_451
from falcon.status_codes import HTTP_500
from falcon.status_codes import HTTP_501
from falcon.status_codes import HTTP_502
from falcon.status_codes import HTTP_503
from falcon.status_codes import HTTP_504
from falcon.status_codes import HTTP_505
from falcon.status_codes import HTTP_506
from falcon.status_codes import HTTP_507
from falcon.status_codes import HTTP_508
from falcon.status_codes import HTTP_510
from falcon.status_codes import HTTP_511
from falcon.status_codes import HTTP_701
from falcon.status_codes import HTTP_702
from falcon.status_codes import HTTP_703
from falcon.status_codes import HTTP_710
from falcon.status_codes import HTTP_711
from falcon.status_codes import HTTP_712
from falcon.status_codes import HTTP_719
from falcon.status_codes import HTTP_720
from falcon.status_codes import HTTP_721
from falcon.status_codes import HTTP_722
from falcon.status_codes import HTTP_723
from falcon.status_codes import HTTP_724
from falcon.status_codes import HTTP_725
from falcon.status_codes import HTTP_726
from falcon.status_codes import HTTP_727
from falcon.status_codes import HTTP_740
from falcon.status_codes import HTTP_741
from falcon.status_codes import HTTP_742
from falcon.status_codes import HTTP_743
from falcon.status_codes import HTTP_744
from falcon.status_codes import HTTP_745
from falcon.status_codes import HTTP_748
from falcon.status_codes import HTTP_749
from falcon.status_codes import HTTP_750
from falcon.status_codes import HTTP_753
from falcon.status_codes import HTTP_754
from falcon.status_codes import HTTP_755
from falcon.status_codes import HTTP_759
from falcon.status_codes import HTTP_771
from falcon.status_codes import HTTP_772
from falcon.status_codes import HTTP_773
from falcon.status_codes import HTTP_774
from falcon.status_codes import HTTP_776
from falcon.status_codes import HTTP_777
from falcon.status_codes import HTTP_778
from falcon.status_codes import HTTP_779
from falcon.status_codes import HTTP_780
from falcon.status_codes import HTTP_781
from falcon.status_codes import HTTP_782
from falcon.status_codes import HTTP_783
from falcon.status_codes import HTTP_784
from falcon.status_codes import HTTP_785
from falcon.status_codes import HTTP_786
from falcon.status_codes import HTTP_791
from falcon.status_codes import HTTP_792
from falcon.status_codes import HTTP_797
from falcon.status_codes import HTTP_799
from falcon.status_codes import HTTP_ACCEPTED
from falcon.status_codes import HTTP_ALREADY_REPORTED
from falcon.status_codes import HTTP_BAD_GATEWAY
from falcon.status_codes import HTTP_BAD_REQUEST
from falcon.status_codes import HTTP_CONFLICT
from falcon.status_codes import HTTP_CONTENT_TOO_LARGE
from falcon.status_codes import HTTP_CONTINUE
from falcon.status_codes import HTTP_CREATED
from falcon.status_codes import HTTP_EARLY_HINTS
from falcon.status_codes import HTTP_EXPECTATION_FAILED
from falcon.status_codes import HTTP_FAILED_DEPENDENCY
from falcon.status_codes import HTTP_FORBIDDEN
from falcon.status_codes import HTTP_FOUND
from falcon.status_codes import HTTP_GATEWAY_TIMEOUT
from falcon.status_codes import HTTP_GONE
from falcon.status_codes import HTTP_HTTP_VERSION_NOT_SUPPORTED
from falcon.status_codes import HTTP_IM_A_TEAPOT
from falcon.status_codes import HTTP_IM_USED
from falcon.status_codes import HTTP_INSUFFICIENT_STORAGE
from falcon.status_codes import HTTP_INTERNAL_SERVER_ERROR
from falcon.status_codes import HTTP_LENGTH_REQUIRED
from falcon.status_codes import HTTP_LOCKED
from falcon.status_codes import HTTP_LOOP_DETECTED
from falcon.status_codes import HTTP_METHOD_NOT_ALLOWED
from falcon.status_codes import HTTP_MISDIRECTED_REQUEST
from falcon.status_codes import HTTP_MOVED_PERMANENTLY
from falcon.status_codes import HTTP_MULTI_STATUS
from falcon.status_codes import HTTP_MULTIPLE_CHOICES
from falcon.status_codes import HTTP_NETWORK_AUTHENTICATION_REQUIRED
from falcon.status_codes import HTTP_NO_CONTENT
from falcon.status_codes import HTTP_NON_AUTHORITATIVE_INFORMATION
from falcon.status_codes import HTTP_NOT_ACCEPTABLE
from falcon.status_codes import HTTP_NOT_EXTENDED
from falcon.status_codes import HTTP_NOT_FOUND
from falcon.status_codes import HTTP_NOT_IMPLEMENTED
from falcon.status_codes import HTTP_NOT_MODIFIED
from falcon.status_codes import HTTP_OK
from falcon.status_codes import HTTP_PARTIAL_CONTENT
from falcon.status_codes import HTTP_PAYMENT_REQUIRED
from falcon.status_codes import HTTP_PERMANENT_REDIRECT
from falcon.status_codes import HTTP_PRECONDITION_FAILED
from falcon.status_codes import HTTP_PRECONDITION_REQUIRED
from falcon.status_codes import HTTP_PROCESSING
from falcon.status_codes import HTTP_PROXY_AUTHENTICATION_REQUIRED
from falcon.status_codes import HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE
from falcon.status_codes import HTTP_REQUEST_TIMEOUT
from falcon.status_codes import HTTP_REQUEST_URI_TOO_LONG
from falcon.status_codes import HTTP_REQUESTED_RANGE_NOT_SATISFIABLE
from falcon.status_codes import HTTP_RESET_CONTENT
from falcon.status_codes import HTTP_SEE_OTHER
from falcon.status_codes import HTTP_SERVICE_UNAVAILABLE
from falcon.status_codes import HTTP_SWITCHING_PROTOCOLS
from falcon.status_codes import HTTP_TEMPORARY_REDIRECT
from falcon.status_codes import HTTP_TOO_EARLY
from falcon.status_codes import HTTP_TOO_MANY_REQUESTS
from falcon.status_codes import HTTP_UNAUTHORIZED
from falcon.status_codes import HTTP_UNAVAILABLE_FOR_LEGAL_REASONS
from falcon.status_codes import HTTP_UNPROCESSABLE_ENTITY
from falcon.status_codes import HTTP_UNSUPPORTED_MEDIA_TYPE
from falcon.status_codes import HTTP_UPGRADE_REQUIRED
from falcon.status_codes import HTTP_USE_PROXY
from falcon.status_codes import HTTP_VARIANT_ALSO_NEGOTIATES
from falcon.stream import BoundedStream

# NOTE(kgriffs): Ensure that "from falcon import uri" will import
#   the same front-door module as "import falcon.uri". This works by
#   priming the import cache with the one we want.
import falcon.uri  # NOQA: F401

# Hoist utilities.
from falcon.util import async_to_sync
from falcon.util import BufferedReader
from falcon.util import CaseInsensitiveDict
from falcon.util import code_to_http_status
from falcon.util import Context
from falcon.util import create_task

# NOTE(kgriffs): Hosting only because this was previously referenced
#   in the docs as falcon.deprecated
from falcon.util import deprecated
from falcon.util import dt_to_http
from falcon.util import ETag
from falcon.util import get_argnames
from falcon.util import get_bound_method
from falcon.util import get_running_loop
from falcon.util import http_cookies
from falcon.util import http_date_to_dt
from falcon.util import http_now
from falcon.util import http_status_to_code
from falcon.util import IS_64_BITS
from falcon.util import is_python_func
from falcon.util import mediatypes
from falcon.util import misc
from falcon.util import parse_header
from falcon.util import reader
from falcon.util import runs_sync
from falcon.util import secure_filename
from falcon.util import structures
from falcon.util import sync
from falcon.util import sync_to_async
from falcon.util import sys  # NOQA: F401
from falcon.util import time
from falcon.util import TimezoneGMT
from falcon.util import to_query_str
from falcon.util import uri
from falcon.util import wrap_sync_to_async
from falcon.util import wrap_sync_to_async_unsafe

# Package version
from falcon.version import __version__  # NOQA: F401

# NOTE(kgriffs): Only to be used internally on the rare occasion that we
#   need to log something that we can't communicate any other way.
_logger = _logging.getLogger('falcon')

# NOTE(vytas): We used to add a NullHandler() to the above _logger;
#   which *could* be done according to the stdlib's docs,
#   "*if* you want to prevent your library's logged events being output to
#   sys.stderr in the absence of logging configuration".
#
#   However, this has mostly resulted in confusion for people trying the ASGI
#   flavor of the framework as HTTP 500 tracebacks may disappear completely,
#   so the revised choice is NOT to prevent last resort logging to sys.stderr.
 


bash
command
cat /tmp/inputs/falcon/_typing.py

output
# Copyright 2021-2025 by Vytautas Liuolia.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Private type aliases used internally by Falcon."""

from __future__ import annotations

from collections.abc import Awaitable
from collections.abc import Iterable
from collections.abc import Mapping
from enum import auto
from enum import Enum
import http
from http.cookiejar import Cookie
from re import Pattern
import sys
from typing import (
Any,
Callable,
Literal,
Optional,
Protocol,
TYPE_CHECKING,
TypeVar,
Union,
)

# NOTE(vytas): Mypy still struggles to handle a conditional import in the EAFP
#   fashion, so we branch on Py version instead (which it does understand).
if sys.version_info >= (3, 11):
from wsgiref.types import StartResponse as StartResponse
from wsgiref.types import WSGIEnvironment as WSGIEnvironment
else:
WSGIEnvironment = dict[str, Any]
StartResponse = Callable[[str, list[tuple[str, str]]], Callable[[bytes], None]]

if TYPE_CHECKING:
from falcon.asgi import Request as AsgiRequest
from falcon.asgi import Response as AsgiResponse
from falcon.asgi import WebSocket
from falcon.asgi_spec import AsgiEvent
from falcon.asgi_spec import AsgiSendMsg
from falcon.http_error import HTTPError
from falcon.request import Request
from falcon.response import Response


class _Unset(Enum):
UNSET = auto()


_T = TypeVar('_T')
_UNSET = _Unset.UNSET
UnsetOr = Union[Literal[_Unset.UNSET], _T]

# NOTE(vytas,jap): TypeVar's "default" argument is only available on 3.13+.
if sys.version_info >= (3, 13):
_ExcT = TypeVar('_ExcT', bound=Exception, default=Exception)
_ReqT = TypeVar('_ReqT', bound='Request', contravariant=True, default='Request')
_RespT = TypeVar('_RespT', bound='Response', contravariant=True, default='Response')
_AReqT = TypeVar(
'_AReqT', bound='AsgiRequest', contravariant=True, default='AsgiRequest'
)
_ARespT = TypeVar(
'_ARespT', bound='AsgiResponse', contravariant=True, default='AsgiResponse'
)
else:
_ExcT = TypeVar('_ExcT', bound=Exception)
_ReqT = TypeVar('_ReqT', bound='Request', contravariant=True)
_RespT = TypeVar('_RespT', bound='Response', contravariant=True)
_AReqT = TypeVar('_AReqT', bound='AsgiRequest', contravariant=True)
_ARespT = TypeVar('_ARespT', bound='AsgiResponse', contravariant=True)

Link = dict[str, str]
CookieArg = Mapping[str, Union[str, Cookie]]


# Error handlers
class ErrorHandler(Protocol[_ReqT, _RespT]):
def __call__(
self,
req: _ReqT,
resp: _RespT,
error: Exception,
params: dict[str, Any],
) -> None: ...


class AsgiErrorHandler(Protocol[_AReqT, _ARespT]):
async def __call__(
self,
req: _AReqT,
resp: _ARespT | None,
error: Exception,
params: dict[str, Any],
*,
ws: WebSocket | None = ...,
) -> None: ...


# Error serializers
ErrorSerializer = Callable[[_ReqT, _RespT, 'HTTPError'], None]

# Sinks
SinkPrefix = Union[str, Pattern[str]]


class SinkCallable(Protocol[_ReqT, _RespT]):
def __call__(self, req: _ReqT, resp: _RespT, **kwargs: Any) -> None: ...


class AsgiSinkCallable(Protocol[_AReqT, _ARespT]):
async def __call__(
self, req: _AReqT, resp: _ARespT | None, **kwargs: Any
) -> None: ...


HeaderMapping = Mapping[str, str]
HeaderIter = Iterable[tuple[str, str]]
HeaderArg = Union[HeaderMapping, HeaderIter]
ResponseStatus = Union[http.HTTPStatus, str, int]
StoreArg = Optional[dict[str, Any]]
Resource = object
RangeSetHeader = Union[tuple[int, int, int], tuple[int, int, int, str]]


# WSGI
class ResponderMethod(Protocol):
def __call__(
self,
resource: Resource,
req: Request,
resp: Response,
**kwargs: Any,
) -> None: ...


class ResponderCallable(Protocol):
def __call__(self, req: Request, resp: Response, **kwargs: Any) -> None: ...


ProcessRequestMethod = Callable[['Request', 'Response'], None]
ProcessResourceMethod = Callable[
['Request', 'Response', Optional[Resource], dict[str, Any]], None
]
ProcessResponseMethod = Callable[
['Request', 'Response', Optional[Resource], bool], None
]


# ASGI
class AsgiResponderMethod(Protocol):
async def __call__(
self,
resource: Resource,
req: AsgiRequest,
resp: AsgiResponse,
**kwargs: Any,
) -> None: ...


class AsgiResponderCallable(Protocol):
async def __call__(
self, req: AsgiRequest, resp: AsgiResponse, **kwargs: Any
) -> None: ...


class AsgiResponderWsCallable(Protocol):
async def __call__(
self, req: AsgiRequest, ws: WebSocket, **kwargs: Any
) -> None: ...


AsgiReceive = Callable[[], Awaitable['AsgiEvent']]
AsgiSend = Callable[['AsgiSendMsg'], Awaitable[None]]
AsgiProcessRequestMethod = Callable[['AsgiRequest', 'AsgiResponse'], Awaitable[None]]
AsgiProcessResourceMethod = Callable[
['AsgiRequest', 'AsgiResponse', Optional[Resource], dict[str, Any]], Awaitable[None]
]
AsgiProcessResponseMethod = Callable[
['AsgiRequest', 'AsgiResponse', Optional[Resource], bool], Awaitable[None]
]
AsgiProcessRequestWsMethod = Callable[['AsgiRequest', 'WebSocket'], Awaitable[None]]
AsgiProcessResourceWsMethod = Callable[
['AsgiRequest', 'WebSocket', Optional[Resource], dict[str, Any]], Awaitable[None]
]
ResponseCallbacks = Union[
tuple[Callable[[], None], Literal[False]],
tuple[Callable[[], Awaitable[None]], Literal[True]],
]


# Routing

MethodDict = Union[
dict[str, ResponderCallable],
dict[str, Union[AsgiResponderCallable, AsgiResponderWsCallable]],
]


class FindMethod(Protocol):
def __call__(
self, uri: str, req: Request | None
) -> tuple[object, MethodDict, dict[str, Any], str | None] | None: ...


# Media
class SerializeSync(Protocol):
def __call__(self, media: Any, content_type: str | None = ...) -> bytes: ...


DeserializeSync = Callable[[bytes], Any]

Responder = Union[ResponderMethod, AsgiResponderMethod]


# WSGI middleware interface
class WsgiMiddlewareWithProcessRequest(Protocol[_ReqT, _RespT]):
"""WSGI Middleware with request handler."""

def process_request(self, req: _ReqT, resp: _RespT) -> None: ...


class WsgiMiddlewareWithProcessResource(Protocol[_ReqT, _RespT]):
"""WSGI Middleware with resource handler."""

def process_resource(
self,
req: _ReqT,
resp: _RespT,
resource: Resource | None,
params: dict[str, Any],
) -> None: ...


class WsgiMiddlewareWithProcessResponse(Protocol[_ReqT, _RespT]):
"""WSGI Middleware with response handler."""

def process_response(
self,
req: _ReqT,
resp: _RespT,
resource: Resource | None,
req_succeeded: bool,
) -> None: ...


# ASGI lifespan middleware interface
class AsgiMiddlewareWithProcessStartup(Protocol):
"""ASGI middleware with startup handler."""

async def process_startup(
self, scope: Mapping[str, Any], event: Mapping[str, Any]
) -> None: ...


class AsgiMiddlewareWithProcessShutdown(Protocol):
"""ASGI middleware with shutdown handler."""

async def process_shutdown(
self, scope: Mapping[str, Any], event: Mapping[str, Any]
) -> None: ...


# ASGI middleware interface
class AsgiMiddlewareWithProcessRequest(Protocol[_AReqT, _ARespT]):
"""ASGI middleware with request handler."""

async def process_request(self, req: _AReqT, resp: _ARespT) -> None: ...


class AsgiMiddlewareWithProcessResource(Protocol[_AReqT, _ARespT]):
"""ASGI middleware with resource handler."""

async def process_resource(
self,
req: _AReqT,
resp: _ARespT,
resource: object,
params: Mapping[str, Any],
) -> None: ...


class AsgiMiddlewareWithProcessResponse(Protocol[_AReqT, _ARespT]):
"""ASGI middleware with response handler."""

async def process_response(
self,
req: _AReqT,
resp: _ARespT,
resource: object,
req_succeeded: bool,
) -> None: ...


# ASGI WebSocket middleware
class AsgiMiddlewareWithProcessRequestWs(Protocol[_AReqT]):
"""ASGI middleware with WebSocket request handler."""

async def process_request_ws(self, req: _AReqT, ws: WebSocket) -> None: ...


class AsgiMiddlewareWithProcessResourceWs(Protocol[_AReqT]):
"""ASGI middleware with WebSocket resource handler."""

async def process_resource_ws(
self,
req: _AReqT,
ws: WebSocket,
resource: object,
params: Mapping[str, Any],
) -> None: ...


# Universal middleware that provides async versions via the _async postfix
class UniversalMiddlewareWithProcessRequest(Protocol[_AReqT, _ARespT]):
"""WSGI/ASGI middleware with request handler."""

async def process_request_async(self, req: _AReqT, resp: _ARespT) -> None: ...


class UniversalMiddlewareWithProcessResource(Protocol[_AReqT, _ARespT]):
"""WSGI/ASGI middleware with resource handler."""

async def process_resource_async(
self,
req: _AReqT,
resp: _ARespT,
resource: object,
params: Mapping[str, Any],
) -> None: ...


class UniversalMiddlewareWithProcessResponse(Protocol[_AReqT, _ARespT]):
"""WSGI/ASGI middleware with response handler."""

async def process_response_async(
self,
req: _AReqT,
resp: _ARespT,
resource: object,
req_succeeded: bool,
) -> None: ...


# NOTE(jkmnt): This typing is far from perfect due to the Python typing limitations,
# but better than nothing. Middleware conforming to any protocol of the union
# will pass the type check. Other protocols violations are not checked.
SyncMiddleware = Union[
WsgiMiddlewareWithProcessRequest[_ReqT, _RespT],
WsgiMiddlewareWithProcessResource[_ReqT, _RespT],
WsgiMiddlewareWithProcessResponse[_ReqT, _RespT],
]
"""Synchronous (WSGI) application middleware.

This type alias reflects the middleware interface for
components that can be used with a WSGI app.
"""

AsyncMiddleware = Union[
AsgiMiddlewareWithProcessRequest[_AReqT, _ARespT],
AsgiMiddlewareWithProcessResource[_AReqT, _ARespT],
AsgiMiddlewareWithProcessResponse[_AReqT, _ARespT],
# Lifespan middleware
AsgiMiddlewareWithProcessStartup,
AsgiMiddlewareWithProcessShutdown,
# WebSocket middleware
AsgiMiddlewareWithProcessRequestWs[_AReqT],
AsgiMiddlewareWithProcessResourceWs[_AReqT],
# Universal middleware with process_*_async methods
UniversalMiddlewareWithProcessRequest[_AReqT, _ARespT],
UniversalMiddlewareWithProcessResource[_AReqT, _ARespT],
UniversalMiddlewareWithProcessResponse[_AReqT, _ARespT],
]
"""Asynchronous (ASGI) application middleware.

This type alias reflects the middleware interface for components that can be
used with an ASGI app.
"""

bash
command
find /tmp/inputs -type d -name "tests" -o -type d -name "test" | head -10

output
/tmp/inputs/falcon/bench/nuts/nuts/tests

bash
command
find /tmp -maxdepth 3 -type d 2>/dev/null | grep -v proc

output
/tmp
/tmp/inputs
/tmp/inputs/falcon
/tmp/inputs/falcon/testing
/tmp/inputs/falcon/media
/tmp/inputs/falcon/bench
/tmp/inputs/falcon/cyutil
/tmp/inputs/falcon/routing
/tmp/inputs/falcon/asgi
/tmp/inputs/falcon/cmd
/tmp/inputs/falcon/util
/tmp/outputs
/tmp/line_io_tools_gnzou
/tmp/tmphnt8_zcs
 


bash
command
ls -la /tmp/inputs/ && ls -la /tmp/outputs/ 2>/dev/null

output
total 0
drwxr-xr-x  3 argocd root  60 Feb 27 21:09 .
drwxrwxrwt  6 root   root 140 Feb 27 21:10 ..
drwxr-xr-x 10 argocd root 700 Feb 27 21:09 falcon
total 0
drwxr-xr-x 2 argocd root  40 Feb 27 21:09 .
drwxrwxrwt 6 root   root 140 Feb 27 21:10 ..

bash
command
find / -path /proc -prune -o -name "test_cors*" -print 2>/dev/null

system
Tool ran without output or errors

bash
command
find / -path /proc -prune -o -name "conftest.py" -print 2>/dev/null | head -20

output
/mnt/sandboxing/model_tools_env/v1/python/install/lib/python3.11/site-packages/IPython/conftest.py
/mnt/sandboxing/model_tools_env/v1/python/install/lib/python3.11/site-packages/async_generator/_tests/conftest.py
/mnt/sandboxing/model_tools_env/v1/python/install/lib/python3.11/site-packages/trio/tests/conftest.py
/mnt/sandboxing/model_tools_env/v1/python/install/lib/python3.11/site-packages/trio/_core/tests/conftest.py
/root/.local/lib/python3.9/site-packages/matplotlib/tests/conftest.py
/root/.local/lib/python3.9/site-packages/matplotlib/testing/conftest.py
/root/.local/lib/python3.9/site-packages/h5netcdf/tests/conftest.py
/root/.local/lib/python3.9/site-packages/networkx/conftest.py
/root/.local/lib/python3.9/site-packages/blis/tests/conftest.py
/root/.local/lib/python3.9/site-packages/numpy/conftest.py
/root/.local/lib/python3.9/site-packages/xarray/tests/conftest.py
/root/.local/lib/python3.9/site-packages/shapely/geometry/conftest.py
/root/.local/lib/python3.9/site-packages/sunpy/net/vso/tests/conftest.py
/root/.local/lib/python3.9/site-packages/sunpy/timeseries/tests/conftest.py
/root/.local/lib/python3.9/site-packages/sunpy/timeseries/sources/tests/conftest.py
/root/.local/lib/python3.9/site-packages/sunpy/data/data_manager/tests/conftest.py
/root/.local/lib/python3.9/site-packages/sunpy/map/tests/conftest.py
/root/.local/lib/python3.9/site-packages/sunpy/conftest.py
/root/.local/lib/python3.9/site-packages/scipy/conftest.py
/root/.local/lib/python3.9/site-packages/parfive/conftest.py

bash
command
pip show falcon 2>/dev/null | head -5

system
Tool ran without output or errors

bash
command
python3 -c "import falcon; print(falcon.__file__)"

Traceback (most recent call last): File "<string>", line 1, in <module> ModuleNotFoundError: No module named 'falcon'

bash
command
find / -path /proc -prune -o -path "*/falcon*" -name "setup.py" -print 2>/dev/null | head -5
find / -path /proc -prune -o -path "*/falcon*" -name "setup.cfg" -print 2>/dev/null | head -5
find / -path /proc -prune -o -path "*/falcon*" -name "pyproject.toml" -print 2>/dev/null | head -5

output
/tmp/inputs/falcon/bench/nuts/setup.py
/tmp/inputs/falcon/bench/nuts/setup.cfg
 


bash
command
cd /tmp/inputs && python3 -c "import falcon; print(falcon.__version__); print(falcon.__file__)"

output
4.3.0.dev1
/tmp/inputs/falcon/__init__.py

bash
command
cat /tmp/inputs/falcon/testing/__init__.py

output
# Copyright 2013 by Rackspace Hosting, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Functional testing framework for Falcon apps and Falcon itself.

Falcon's testing module contains various test classes and utility
functions to support functional testing for both Falcon-based apps and
the Falcon framework itself.

The testing framework supports both :mod:`unittest` and
`pytest <https://docs.pytest.org/>`__.

Tests are normally carried out by simulating HTTP requests by calling the
corresponding :class:`TestClient` methods, e.g.,
:meth:`~falcon.testing.TestClient.simulate_get`,
:meth:`~falcon.testing.TestClient.simulate_post`, etc::

# -----------------------------------------------------------------
# unittest
# -----------------------------------------------------------------

from falcon import testing
import myapp


class MyTestCase(testing.TestCase):
def setUp(self):
super(MyTestCase, self).setUp()

# Assume the hypothetical `myapp` package has a
# function called `create()` to initialize and
# return a `falcon.App` instance.
self.app = myapp.create()


class TestMyApp(MyTestCase):
def test_get_message(self):
doc = {'message': 'Hello world!'}

result = self.simulate_get('/messages/42')
self.assertEqual(result.json, doc)


# -----------------------------------------------------------------
# pytest
# -----------------------------------------------------------------

from falcon import testing
import pytest

import myapp


# Depending on your testing strategy and how your application
# manages state, you may be able to broaden the fixture scope
# beyond the default 'function' scope used in this example.

@pytest.fixture()
def client():
# Assume the hypothetical `myapp` package has a function called
# `create()` to initialize and return a `falcon.App` instance.
return testing.TestClient(myapp.create())


def test_get_message(client):
doc = {'message': 'Hello world!'}

result = client.simulate_get('/messages/42')
assert result.json == doc

As shown above, the responses rendered by the application are encapsulated by
the test :class:`Result`.

Tip:
:class:`Result` objects implement a ``__rich__`` method for facilitating a
rich-text representation when used together with the popular
`rich <https://rich.readthedocs.io/>`__ library.

For instance, provided you have installed both Falcon and ``rich`` into
your environment, you should be able to see a prettier rendition of the
below 404-result:

>>> import falcon
>>> import falcon.testing
>>> import rich.pretty
>>> rich.pretty.install()
>>> client = falcon.testing.TestClient(falcon.App())
>>> client.get('/endpoint')
Result<404 Not Found application/json b'{"title": "404 Not Found"}'>
"""

# Hoist classes and functions into the falcon.testing namespace
from falcon import util as _util
from falcon.testing.client import ASGIConductor
from falcon.testing.client import Cookie
from falcon.testing.client import Result
from falcon.testing.client import ResultBodyStream
from falcon.testing.client import simulate_delete
from falcon.testing.client import simulate_get
from falcon.testing.client import simulate_head
from falcon.testing.client import simulate_options
from falcon.testing.client import simulate_patch
from falcon.testing.client import simulate_post
from falcon.testing.client import simulate_put
from falcon.testing.client import simulate_request
from falcon.testing.client import StreamedResult
from falcon.testing.client import TestClient
from falcon.testing.helpers import ASGILifespanEventEmitter
from falcon.testing.helpers import ASGIRequestEventEmitter
from falcon.testing.helpers import ASGIResponseEventCollector
from falcon.testing.helpers import ASGIWebSocketSimulator
from falcon.testing.helpers import closed_wsgi_iterable
from falcon.testing.helpers import create_asgi_req
from falcon.testing.helpers import create_environ
from falcon.testing.helpers import create_req
from falcon.testing.helpers import create_scope
from falcon.testing.helpers import create_scope_ws
from falcon.testing.helpers import DEFAULT_HOST
from falcon.testing.helpers import DEFAULT_UA
from falcon.testing.helpers import get_encoding_from_headers
from falcon.testing.helpers import get_unused_port
from falcon.testing.helpers import rand_string
from falcon.testing.helpers import redirected
from falcon.testing.resource import capture_responder_args
from falcon.testing.resource import capture_responder_args_async
from falcon.testing.resource import set_resp_defaults
from falcon.testing.resource import set_resp_defaults_async
from falcon.testing.resource import SimpleTestResource
from falcon.testing.resource import SimpleTestResourceAsync
from falcon.testing.srmock import StartResponseMock
from falcon.testing.test_case import TestCase

__all__ = (
# client
'ASGIConductor',
'Cookie',
'Result',
'ResultBodyStream',
'simulate_delete',
'simulate_get',
'simulate_head',
'simulate_options',
'simulate_patch',
'simulate_post',
'simulate_put',
'simulate_request',
'StreamedResult',
'TestClient',
# helpers
'ASGILifespanEventEmitter',
'ASGIRequestEventEmitter',
'ASGIResponseEventCollector',
'ASGIWebSocketSimulator',
'closed_wsgi_iterable',
'create_asgi_req',
'create_environ',
'create_req',
'create_scope',
'create_scope_ws',
'DEFAULT_HOST',
'DEFAULT_UA',
'get_encoding_from_headers',
'get_unused_port',
'rand_string',
'redirected',
# resource
'capture_responder_args',
'capture_responder_args_async',
'set_resp_defaults',
'set_resp_defaults_async',
'SimpleTestResource',
'SimpleTestResourceAsync',
# srmock
'StartResponseMock',
# test_case
'TestCase',
)


# NOTE(kgriffs): Alias for backwards-compatibility with Falcon 0.2
# TODO(vytas): Remove in Falcon 5.0.
httpnow = _util.deprecated(
'This method is deprecated and will be removed in Falcon 5.0. '
'Use `falcon.util.http_now` instead.'
)(_util.http_now)

bash
command
cat /tmp/inputs/falcon/testing/resource.py

output
# Copyright 2013 by Rackspace Hosting, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Mock resource classes.

This module contains mock resource classes and associated hooks for use
in Falcon framework tests. The classes and hooks may be referenced
directly from the `testing` package::

from falcon import testing

resource = testing.SimpleTestResource()
"""

from __future__ import annotations

from json import dumps as json_dumps
import typing

import falcon

if typing.TYPE_CHECKING:  # pragma: no cover
from falcon import app as wsgi
from falcon._typing import HeaderArg
from falcon._typing import Resource
from falcon.asgi import app as asgi


def capture_responder_args(
req: wsgi.Request,
resp: wsgi.Response,
resource: object,
params: typing.Mapping[str, str],
) -> None:
"""Before hook for capturing responder arguments.

Adds the following attributes to the hooked responder's resource
class:

* `captured_req`
* `captured_resp`
* `captured_kwargs`

In addition, if the capture-req-body-bytes header is present in the
request, the following attribute is added:

* `captured_req_body`

Including the capture-req-media header in the request (set to any
value) will add the following attribute:

* `capture-req-media`
"""

simple_resource = typing.cast(SimpleTestResource, resource)
simple_resource.captured_req = req
simple_resource.captured_resp = resp
simple_resource.captured_kwargs = params

simple_resource.captured_req_media = None
simple_resource.captured_req_body = None

num_bytes = req.get_header('capture-req-body-bytes')
if num_bytes:
simple_resource.captured_req_body = req.stream.read(int(num_bytes))
elif req.get_header('capture-req-media'):
simple_resource.captured_req_media = req.get_media()


async def capture_responder_args_async(
req: asgi.Request,
resp: asgi.Response,
resource: Resource,
params: typing.Mapping[str, str],
) -> None:
"""Before hook for capturing responder arguments.

An asynchronous version of :meth:`~falcon.testing.capture_responder_args`.
"""

simple_resource = typing.cast(SimpleTestResource, resource)
simple_resource.captured_req = req
simple_resource.captured_resp = resp
simple_resource.captured_kwargs = params

simple_resource.captured_req_media = None
simple_resource.captured_req_body = None

num_bytes = req.get_header('capture-req-body-bytes')
if num_bytes:
simple_resource.captured_req_body = await req.stream.read(int(num_bytes))
elif req.get_header('capture-req-media'):
simple_resource.captured_req_media = await req.get_media()


def set_resp_defaults(
req: wsgi.Request,
resp: wsgi.Response,
resource: Resource,
params: typing.Mapping[str, str],
) -> None:
"""Before hook for setting default response properties.

This hook simply sets the the response body, status,
and headers to the `_default_status`,
`_default_body`, and `_default_headers` attributes
that are assumed to be defined on the resource
object.
"""
simple_resource = typing.cast(SimpleTestResource, resource)
if simple_resource._default_status is not None:
resp.status = simple_resource._default_status

if simple_resource._default_body is not None:
resp.text = simple_resource._default_body

if simple_resource._default_headers is not None:
resp.set_headers(simple_resource._default_headers)


async def set_resp_defaults_async(
req: asgi.Request,
resp: asgi.Response,
resource: Resource,
params: typing.Mapping[str, str],
) -> None:
"""Wrap :meth:`~falcon.testing.set_resp_defaults` in a coroutine."""
set_resp_defaults(req, resp, resource, params)


class SimpleTestResource:
"""Mock resource for functional testing of framework components.

This class implements a simple test resource that can be extended
as needed to test middleware, hooks, and the Falcon framework
itself.

Only noop ``on_get()`` and ``on_post()`` responders are implemented;
when overriding these, or adding additional responders in child
classes, they can be decorated with the
:meth:`falcon.testing.capture_responder_args` hook in
order to capture the *req*, *resp*, and *params* arguments that
are passed to the responder. Responders may also be decorated with
the :meth:`falcon.testing.set_resp_defaults` hook in order to
set *resp* properties to default *status*, *body*, and *header*
values.

Keyword Arguments:
status (str): Default status string to use in responses
body (str): Default body string to use in responses
json (JSON serializable): Default JSON document to use in responses.
Will be serialized to a string and encoded as UTF-8. Either
*json* or *body* may be specified, but not both.
headers (dict): Default set of additional headers to include in
responses
"""

captured_req: wsgi.Request | asgi.Request | None
"""The last Request object passed into any one of the responder methods."""
captured_resp: wsgi.Response | asgi.Response | None
"""The last Response object passed into any one of the responder methods."""

captured_kwargs: typing.Any | None
"""The last dictionary of kwargs, beyond ``req`` and ``resp``, that were
passed into any one of the responder methods."""

captured_req_media: typing.Any | None
"""The last Request media provided to any one of the responder methods.

This value is only captured when the ``'capture-req-media'`` header is
set on the request.
"""
captured_req_body: bytes | None
"""The last Request body provided to any one of the responder methods.

This value is only captured when the ``'capture-req-body-bytes'`` header is
set on the request. The value of the header is the number of bytes to read.
"""

def __init__(
self,
status: str | None = None,
body: str | None = None,
json: dict[str, str] | None = None,
headers: HeaderArg | None = None,
) -> None:
self._default_status = status
self._default_headers = headers

if json is not None:
if body is not None:
msg = 'Either json or body may be specified, but not both'
raise ValueError(msg)

self._default_body: str | None = json_dumps(json, ensure_ascii=False)

else:
self._default_body = body

self.captured_req = None
self.captured_resp = None
self.captured_kwargs = None
self.captured_req_media = None
self.captured_req_body = None

@property
def called(self) -> bool:
"""Whether or not a req/resp was captured."""
return self.captured_req is not None

@falcon.before(capture_responder_args)
@falcon.before(set_resp_defaults)
def on_get(
self, req: wsgi.Request, resp: wsgi.Response, **kwargs: typing.Any
) -> None:
pass

@falcon.before(capture_responder_args)
@falcon.before(set_resp_defaults)
def on_post(
self, req: wsgi.Request, resp: wsgi.Response, **kwargs: typing.Any
) -> None:
pass


class SimpleTestResourceAsync(SimpleTestResource):
"""Mock resource for functional testing of ASGI framework components.

This class implements a simple test resource that can be extended
as needed to test middleware, hooks, and the Falcon framework
itself. It is identical to SimpleTestResource, except that it implements
asynchronous responders for use with the ASGI interface.

Only noop ``on_get()`` and ``on_post()`` responders are implemented;
when overriding these, or adding additional responders in child
classes, they can be decorated with the
:meth:`falcon.testing.capture_responder_args` hook in
order to capture the *req*, *resp*, and *params* arguments that
are passed to the responder. Responders may also be decorated with
the :meth:`falcon.testing.set_resp_defaults` hook in order to
set *resp* properties to default *status*, *body*, and *header*
values.

Keyword Arguments:
status (str): Default status string to use in responses
body (str): Default body string to use in responses
json (JSON serializable): Default JSON document to use in responses.
Will be serialized to a string and encoded as UTF-8. Either
*json* or *body* may be specified, but not both.
headers (dict): Default set of additional headers to include in
responses
"""

@falcon.before(capture_responder_args_async)
@falcon.before(set_resp_defaults_async)
async def on_get(  # type: ignore[override]
self, req: asgi.Request, resp: asgi.Response, **kwargs: typing.Any
) -> None:
pass

@falcon.before(capture_responder_args_async)
@falcon.before(set_resp_defaults_async)
async def on_post(  # type: ignore[override]
self, req: asgi.Request, resp: asgi.Response, **kwargs: typing.Any
) -> None:
pass

bash
command
grep -n "Context" /tmp/inputs/falcon/util/structures.py | head -20

output
117:# NOTE(vytas): Although Context is effectively implementing the MutableMapping
119:#   Context is, by design, a bare class, and the mapping interface may be
121:class Context:
135:    >>> context = falcon.Context()
205:    def copy(self) -> Context:

bash
command
grep -n "context" /tmp/inputs/falcon/request.py | head -30

output
105:        'context',
123:    context_type: ClassVar[type] = structures.Context
125:    type to use for initializing the `context` attribute. By default,
133:        When overriding `context_type` with a factory function (as
145:    context: structures.Context
153:        default context type, is to set attributes directly on the
154:        `context` object. For example::
156:            req.context.role = 'trial'
157:            req.context.user = 'guest'
339:        self.context = self.context_type()

bash
command
sed -n '100,220p' /tmp/inputs/falcon/util/structures.py

output

def __eq__(self, other: object) -> bool:
if isinstance(other, Mapping):
other = CaseInsensitiveDict(other)
else:
return NotImplemented
# Compare insensitively
return dict(self.lower_items()) == dict(other.lower_items())

# Copy is required
def copy(self) -> CaseInsensitiveDict:
return CaseInsensitiveDict(self._store.values())

def __repr__(self) -> str:
return '%s(%r)' % (self.__class__.__name__, dict(self.items()))


# NOTE(vytas): Although Context is effectively implementing the MutableMapping
#   interface, we choose not to subclass MutableMapping to stress the fact that
#   Context is, by design, a bare class, and the mapping interface may be
#   removed in a future Falcon release.
class Context:
"""Convenience class to hold contextual information in its attributes.

This class is used as the default :class:`~.Request` and :class:`~Response`
context type (see
:attr:`Request.context_type <falcon.Request.context_type>` and
:attr:`Response.context_type <falcon.Response.context_type>`,
respectively).

In Falcon versions prior to 2.0, the default context type was ``dict``. To
ease the migration to attribute-based context object approach, this class
also implements the mapping interface; that is, object attributes are
linked to dictionary items, and vice versa. For instance:

>>> context = falcon.Context()
>>> context.cache_strategy = 'lru'
>>> context.get('cache_strategy')
'lru'
>>> 'cache_strategy' in context
True

Although we have decided to maintain the mapping interface in the
foreseeable future, new code should prefer the attribute-based approach, as
it is more performant.

What is more, if you continue to use the mapping interface
(or mix-and-match), care needs to be taken not to overwrite :class:`dict`
methods such as :meth:`~dict.items`, :meth:`~dict.values`, etc.
"""

# NOTE(vytas): Define synthetic attr access methods (under TYPE_CHECKING)
#   merely to let mypy know this is a namespace object.
if TYPE_CHECKING:

def __getattr__(self, name: str) -> Any: ...

def __setattr__(self, name: str, value: Any) -> None: ...

def __delattr__(self, name: str) -> None: ...

def __contains__(self, key: str) -> bool:
return self.__dict__.__contains__(key)

def __getitem__(self, key: str) -> Any | None:
# PERF(vytas): On CPython, using this mapping interface (instead of a
#   standard dict) to get, set and delete items incurs overhead
#   approximately comparable to that of two function calls
#   (per get/set/delete operation, that is).
return self.__dict__.__getitem__(key)

def __setitem__(self, key: str, value: Any) -> None:
return self.__dict__.__setitem__(key, value)

def __delitem__(self, key: str) -> None:
self.__dict__.__delitem__(key)

def __iter__(self) -> Iterator[str]:
return self.__dict__.__iter__()

def __len__(self) -> int:
return self.__dict__.__len__()

def __eq__(self, other: object) -> bool:
if isinstance(other, type(self)):
return self.__dict__.__eq__(other.__dict__)
return self.__dict__.__eq__(other)

def __ne__(self, other: object) -> bool:
if isinstance(other, type(self)):
return self.__dict__.__ne__(other.__dict__)
return self.__dict__.__ne__(other)

def __hash__(self) -> int:
return hash(self.__dict__)

def __repr__(self) -> str:
return '{}({})'.format(type(self).__name__, self.__dict__.__repr__())

def __str__(self) -> str:
return '{}({})'.format(type(self).__name__, self.__dict__.__str__())

def clear(self) -> None:
return self.__dict__.clear()

def copy(self) -> Context:
ctx = type(self)()
ctx.update(self.__dict__)
return ctx

def get(self, key: str, default: Any | None = None) -> Any | None:
return self.__dict__.get(key, default)

def items(self) -> ItemsView[str, Any]:
return self.__dict__.items()

def keys(self) -> KeysView[str]:
return self.__dict__.keys()

def pop(self, key: str, default: Any | None = None) -> Any | None:
return self.__dict__.pop(key, default)

bash
command
sed -n '95,170p' /tmp/inputs/falcon/request.py

output
        '_cached_forwarded_prefix',
'_cached_forwarded_uri',
'_cached_headers',
'_cached_headers_lower',
'_cached_prefix',
'_cached_relative_uri',
'_cached_uri',
'_params',
'_wsgierrors',
'content_type',
'context',
'env',
'method',
'options',
'path',
'query_string',
'stream',
'uri_template',
'_media',
'_media_error',
'is_websocket',
)
_cookies: dict[str, list[str]] | None = None
_cookies_collapsed: dict[str, str] | None = None
_cached_if_match: UnsetOr[list[ETag | Literal['*']] | None] = _UNSET
_cached_if_none_match: UnsetOr[list[ETag | Literal['*']] | None] = _UNSET

# Child classes may override this
context_type: ClassVar[type] = structures.Context
"""Class variable that determines the factory or
type to use for initializing the `context` attribute. By default,
the framework will instantiate bare objects (instances of the bare
:class:`falcon.Context` class). However, you may override this
behavior by creating a custom child class of
``Request``, and then passing that new class to
``App()`` by way of the latter's `request_type` parameter.

Note:
When overriding `context_type` with a factory function (as
opposed to a class), the function is called like a method of
the current ``Request`` instance. Therefore the first argument
is the Request instance itself (i.e., `self`).

"""

# Attribute declaration
env: dict[str, Any]
"""Reference to the WSGI environ ``dict`` passed in from the
server. (See also PEP-3333.)
"""
context: structures.Context
"""Empty object to hold any data (in its attributes)
about the request which is specific to your app (e.g. session
object). Falcon itself will not interact with this attribute after
it has been initialized.

Note:
The preferred way to pass request-specific data, when using the
default context type, is to set attributes directly on the
`context` object. For example::

req.context.role = 'trial'
req.context.user = 'guest'
"""
method: str
"""HTTP method requested, uppercase (e.g., ``'GET'``, ``'POST'``, etc.)"""
path: str
"""Path portion of the request URI (not including query string).

Warning:
If this attribute is to be used by the app for any upstream
requests, any non URL-safe characters in the path must be URL
encoded back before making the request.

Note:
``req.path`` may be set to a new value by a
Now let me look at how the test client works with headers:
bash
command
grep -n "class Result" /tmp/inputs/falcon/testing/client.py | head -5

output
284:class ResultBodyStream:
321:class Result(_ResultBase):

bash
command
grep -n "def headers" /tmp/inputs/falcon/testing/client.py | head -5

output
245:    def headers(self) -> Headers:

bash
command
grep -n "headers" /tmp/inputs/falcon/testing/client.py | head -40

output
214:        headers (list): A list of (header_name, header_value) tuples,
218:    def __init__(self, status: str, headers: HeaderIter) -> None:
221:        self._headers = CaseInsensitiveDict(headers)
224:        for name, value in headers:
232:        self._encoding = helpers.get_encoding_from_headers(self._headers)
245:    def headers(self) -> Headers:
246:        """A case-insensitive dictionary containing all the headers in the response,
253:            will "win" and be represented in `headers`.
255:        return self._headers  # type: ignore[return-value]
281:        return self.headers.get('Content-Type')
329:        headers (list): A list of (header_name, header_value) tuples,
334:        self, iterable: Iterable[bytes], status: str, headers: HeaderIter
336:        super().__init__(status, headers)
424:        headers (list): A list of (header_name, header_value) tuples,
440:        headers: HeaderIter,
444:        super().__init__(status, headers)
475:    headers: HeaderArg | None = None,
545:            `headers` keyword argument. The ``falcon`` module provides a number
547:        headers (dict): Extra headers as a dict-like (Mapping) object, or an
568:            the `content_type` or `headers` arguments.
612:            headers=headers,
630:    path, query_string, headers, body, extras = _prepare_sim_args(
636:        headers,
647:        headers=headers,
677:    assert srmock.status is not None and srmock.headers is not None
678:    return Result(data, srmock.status, srmock.headers)
687:    headers: HeaderArg | None = ...,
714:    headers: HeaderArg | None = ...,
744:    headers: HeaderArg | None = None,
808:            `headers` keyword argument. The ``falcon`` module provides a number
810:        headers (dict): Extra headers as a dict-like (Mapping) object, or an
831:            the `content_type` or `headers` arguments.
861:    path, query_string, headers, body, extras = _prepare_sim_args(
867:        headers,
888:        headers=headers,
929:            #   status or headers to pass to StreamedResult.
936:                resp_event_collector.headers,
946:            resp_event_collector.headers,
999:        resp_event_collector.headers,
1080:        headers (dict): Default headers to set on every request (default

bash
command
sed -n '240,290p' /tmp/inputs/falcon/testing/client.py

output
    def status_code(self) -> int:
"""The code portion of the HTTP status string."""
return self._status_code

@property
def headers(self) -> Headers:
"""A case-insensitive dictionary containing all the headers in the response,
except for cookies, which may be accessed via the `cookies` attribute.

Note:

Multiple instances of a header in the response are
currently not supported; it is unspecified which value
will "win" and be represented in `headers`.
"""  # noqa: D205
return self._headers  # type: ignore[return-value]

@property
def cookies(self) -> dict[str, Cookie]:
"""A dictionary of :class:`falcon.testing.Cookie` values parsed from
the response, by name.

The cookies dictionary can be used directly in subsequent requests::

client = testing.TestClient(app)
response_one = client.simulate_get('/')
response_two = client.simulate_post('/', cookies=response_one.cookies)
"""  # noqa: D205
return self._cookies

@property
def encoding(self) -> str | None:
"""Text encoding of the response body.

Returns ``None`` if the encoding can not be determined.
"""
return self._encoding

@property
def content_type(self) -> str | None:
"""Return the ``Content-Type`` header or ``None`` if missing."""
return self.headers.get('Content-Type')


class ResultBodyStream:
"""Simple forward-only reader for a streamed test result body.

Args:
chunks (list): Reference to a list of body chunks that may
continue to be appended to as more body events are
collected.

bash
command
grep -n "process_request" /tmp/inputs/falcon/app_helpers.py | head -20

output
138:            process_request: APRequest | None | PRequest | None = util.get_bound_method(
139:                component, 'process_request_async'
141:                util.get_bound_method(component, 'process_request')
158:            for m in (process_request, process_resource, process_response):
176:            process_request = util.get_bound_method(component, 'process_request')
180:            for m in (process_request, process_resource, process_response):
191:        if not (process_request or process_resource or process_response):
197:                    'process_request_ws',
212:            if process_request:
213:                request_mw.append(process_request)  # type: ignore[arg-type]
217:            if process_request or process_response:
218:                request_mw.append((process_request, process_response))  # type: ignore[arg-type]
244:        *request_mw* is an ordered list of ``process_request_ws()`` methods,
254:    process_request_ws: AsgiProcessRequestWsMethod | None
258:        process_request_ws = util.get_bound_method(component, 'process_request_ws')
261:        for m in (process_request_ws, process_resource_ws):
275:        if process_request_ws:
276:            request_mw.append(process_request_ws)

bash
command
sed -n '120,230p' /tmp/inputs/falcon/app_helpers.py

output

# PERF(kgriffs): do getattr calls once, in advance, so we don't
# have to do them every time in the request path.
request_mw: (
list[PRequest]
| list[tuple[PRequest | None, PResource | None]]
| list[APRequest]
| list[tuple[APRequest | None, APResource | None]]
) = []
resource_mw: list[APResource] | list[PResource] = []
response_mw: list[APResponse] | list[PResponse] = []

for component in middleware:
# NOTE(kgriffs): Middleware that supports both WSGI and ASGI can
#   append an *_async postfix to the ASGI version of the method
#   to distinguish the two. Otherwise, the prefix is unnecessary.

if asgi:
process_request: APRequest | None | PRequest | None = util.get_bound_method(
component, 'process_request_async'
) or _wrap_non_coroutine_unsafe(
util.get_bound_method(component, 'process_request')
)

process_resource: APResource | None | PResource | None = (
util.get_bound_method(component, 'process_resource_async')
or _wrap_non_coroutine_unsafe(
util.get_bound_method(component, 'process_resource')
)
)

process_response: APResponse | None | PResponse | None = (
util.get_bound_method(component, 'process_response_async')
or _wrap_non_coroutine_unsafe(
util.get_bound_method(component, 'process_response')
)
)

for m in (process_request, process_resource, process_response):
# NOTE(kgriffs): iscoroutinefunction() always returns False
#   for cythonized functions.
#
#   https://github.com/cython/cython/issues/2273
#   https://bugs.python.org/issue38225
#
if m and not iscoroutinefunction(m) and util.is_python_func(m):
msg = (
'{} must be implemented as an awaitable coroutine. If '
'you would like to retain compatibility '
'with WSGI apps, the coroutine versions of the '
'middleware methods may be implemented side-by-side '
'by applying an *_async postfix to the method names. '
)
raise CompatibilityError(msg.format(m))

else:
process_request = util.get_bound_method(component, 'process_request')
process_resource = util.get_bound_method(component, 'process_resource')
process_response = util.get_bound_method(component, 'process_response')

for m in (process_request, process_resource, process_response):
if m and iscoroutinefunction(m):
msg = (
'{} may not implement coroutine methods and '
'remain compatible with WSGI apps without '
'using the *_async postfix to explicitly identify '
'the coroutine version of a given middleware '
'method.'
)
raise CompatibilityError(msg.format(component))

if not (process_request or process_resource or process_response):
if asgi and any(
hasattr(component, m)
for m in [
'process_startup',
'process_shutdown',
'process_request_ws',
'process_resource_ws',
]
):
# NOTE(kgriffs): This middleware only has ASGI lifespan
#   event handlers
continue

msg = '{0} must implement at least one middleware method'
raise TypeError(msg.format(component))

# NOTE: depending on whether we want to execute middleware
# independently, we group response and request middleware either
# together or separately.
if independent_middleware:
if process_request:
request_mw.append(process_request)  # type: ignore[arg-type]
if process_response:
response_mw.insert(0, process_response)  # type: ignore[arg-type]
else:
if process_request or process_response:
request_mw.append((process_request, process_response))  # type: ignore[arg-type]

if process_resource:
resource_mw.append(process_resource)  # type: ignore[arg-type]

return tuple(request_mw), tuple(resource_mw), tuple(response_mw)  # type: ignore[return-value]


AsyncPreparedMiddlewareWsResult = tuple[
tuple[AsgiProcessRequestWsMethod, ...], tuple[AsgiProcessResourceWsMethod, ...]
]

Now I understand the middleware system. Let me check the ASGI app to understand how middleware gets used there as well:
bash
command
grep -n "CORSMiddleware" /tmp/inputs/falcon/asgi/__init__.py

system
Tool ran without output or errors

bash
command
cat /tmp/inputs/falcon/asgi/__init__.py

output
# Copyright 2019 by Kurt Griffiths.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""ASGI package for Falcon, the minimalist web API framework.

The `falcon.asgi` package can be used to directly access most of
the framework's ASGI-related classes, functions, and variables::

import falcon.asgi

app = falcon.asgi.API()

Some ASGI-related methods and classes are found in other modules
(most notably falcon.testing) when their purpose is particularly cohesive with
that of the module in question.
"""

from .app import App
from .request import Request
from .response import Response
from .stream import BoundedStream
from .structures import SSEvent
from .ws import WebSocket
from .ws import WebSocketOptions

__all__ = (
'App',
'BoundedStream',
'Request',
'Response',
'SSEvent',
'WebSocket',
'WebSocketOptions',
)

bash
command
pip list 2>/dev/null | grep -iE "pytest|asyncio" | head -10

output
nest-asyncio                       1.5.1
pytest                             6.2.4
pytest-cov                         4.1.0
pytest-reportlog                   0.3.0
pytest-timeout                     2.1.0

bash
command
python3 --version && pip show pytest-asyncio 2>/dev/null | head -3

output
Python 3.9.7

bash
command
cd /tmp/inputs && python3 -c "
import falcon
import falcon.testing as testing

# Quick test to ensure falcon works
app = falcon.App()

class TestResource:
    def on_get(self, req, resp):
        resp.media = {'hello': 'world'}

app.add_route('/test', TestResource())

client = testing.TestClient(app)
result = client.simulate_get('/test')
print('Status:', result.status)
print('Headers:', dict(result.headers))
print('Body:', result.json)
"

output
Status: 200 OK
Headers: {'content-type': 'application/json', 'content-length': '18'}
Body: {'hello': 'world'}
 


bash
command
cd /tmp/inputs && python3 -c "
import falcon.asgi
import falcon.testing as testing

# Quick test to ensure falcon ASGI works
app = falcon.asgi.App()

class TestResource:
    async def on_get(self, req, resp):
        resp.media = {'hello': 'world'}

app.add_route('/test', TestResource())

client = testing.TestClient(app)
result = client.simulate_get('/test')
print('Status:', result.status)
print('Headers:', dict(result.headers))
print('Body:', result.json)
"

output
Status: 200 OK
Headers: {'content-type': 'application/json', 'content-length': '18'}
Body: {'hello': 'world'}

bash
command
grep -n "get_header" /tmp/inputs/falcon/request.py | head -10

output
377:            forwarded = self.get_header('Forwarded')
484:        return self.get_header_as_datetime('Date')
541:        return self.get_header_as_datetime('If-Modified-Since')
553:        return self.get_header_as_datetime('If-Unmodified-Since')
570:        value = self.get_header('Range')
618:        value = self.get_header('Range')
885:            instead use the ``get_header()`` method or one of the
939:                header_value = self.get_header('Cookie')
1220:    def get_header(
1225:    def get_header(self, name: str, required: bool = ..., *, default: str) -> str: ...

bash
command
sed -n '1220,1280p' /tmp/inputs/falcon/request.py

output
    def get_header(
self, name: str, required: Literal[True], default: str | None = ...
) -> str: ...

@overload
def get_header(self, name: str, required: bool = ..., *, default: str) -> str: ...

@overload
def get_header(
self, name: str, required: bool = ..., default: str | None = ...
) -> str | None: ...

def get_header(
self, name: str, required: bool = False, default: str | None = None
) -> str | None:
"""Retrieve the raw string value for the given header.

Args:
name (str): Header name, case-insensitive (e.g., 'Content-Type')

Keyword Args:
required (bool): Set to ``True`` to raise
``HTTPBadRequest`` instead of returning gracefully when the
header is not found (default ``False``).
default (any): Value to return if the header
is not found (default ``None``).

Returns:
str: The value of the specified header if it exists, or
the default value if the header is not found and is not
required.

Raises:
HTTPBadRequest: The header was not found in the request, but
it was required.

"""

wsgi_name = name.upper().replace('-', '_')

# Use try..except to optimize for the header existing in most cases
try:
# Don't take the time to cache beforehand, using HTTP naming.
# This will be faster, assuming that most headers are looked
# up only once, and not all headers will be requested.
return self.env['HTTP_' + wsgi_name]

except KeyError:
# NOTE(kgriffs): There are a couple headers that do not
# use the HTTP prefix in the env, so try those. We expect
# people to usually just use the relevant helper properties
# to access these instead of .get_header.
if wsgi_name in WSGI_CONTENT_HEADERS:
try:
return self.env[wsgi_name]
except KeyError:
pass

if not required:
return default
Now I understand the full picture. Let me check if there's an existing `test` directory to see test patterns:
bash
command
ls -la /tmp/inputs/ && find /tmp/inputs -type d

output
total 0
drwxr-xr-x  3 argocd root  60 Feb 27 21:09 .
drwxrwxrwt  6 root   root 140 Feb 27 21:13 ..
drwxr-xr-x 11 argocd root 720 Feb 27 21:12 falcon
/tmp/inputs
/tmp/inputs/falcon
/tmp/inputs/falcon/testing
/tmp/inputs/falcon/testing/__pycache__
/tmp/inputs/falcon/media
/tmp/inputs/falcon/media/validators
/tmp/inputs/falcon/media/__pycache__
/tmp/inputs/falcon/bench
/tmp/inputs/falcon/bench/nuts
/tmp/inputs/falcon/bench/nuts/nuts
/tmp/inputs/falcon/bench/nuts/nuts/controllers
/tmp/inputs/falcon/bench/nuts/nuts/templates
/tmp/inputs/falcon/bench/nuts/nuts/tests
/tmp/inputs/falcon/bench/nuts/nuts/model
/tmp/inputs/falcon/bench/nuts/public
/tmp/inputs/falcon/bench/nuts/public/css
/tmp/inputs/falcon/bench/nuts/public/images
/tmp/inputs/falcon/bench/queues
/tmp/inputs/falcon/bench/dj
/tmp/inputs/falcon/bench/dj/hello
/tmp/inputs/falcon/bench/dj/hello/migrations
/tmp/inputs/falcon/bench/dj/dj
/tmp/inputs/falcon/cyutil
/tmp/inputs/falcon/cyutil/__pycache__
/tmp/inputs/falcon/routing
/tmp/inputs/falcon/routing/__pycache__
/tmp/inputs/falcon/asgi
/tmp/inputs/falcon/asgi/__pycache__
/tmp/inputs/falcon/cmd
/tmp/inputs/falcon/util
/tmp/inputs/falcon/util/__pycache__
/tmp/inputs/falcon/__pycache__

bash
command
# Search for any existing test files to understand patterns
find / -path /proc -prune -o -name "test_middleware*.py" -print 2>/dev/null
find / -path /proc -prune -o -name "test_cors*.py" -print 2>/dev/null

system
Tool ran without output or errors
 

Now I have a clear understanding of the codebase. Let me look at how `set_header` and `get_header` work on the response:
bash
command
grep -n "def set_header\b" /tmp/inputs/falcon/response.py | head -5

output
700:    def set_header(self, name: str, value: str) -> None:

bash
command
grep -n "def get_header\b" /tmp/inputs/falcon/response.py | head -5

output
663:    def get_header(self, name: str, default: str) -> str: ...
666:    def get_header(self, name: str, default: str | None = ...) -> str | None: ...
668:    def get_header(self, name: str, default: str | None = None) -> str | None:

bash
command
# Let me check what's already in __init__.py around the CORSMiddleware import
grep -n "CORSMiddleware" /tmp/inputs/falcon/__init__.py

output
35:    'CORSMiddleware',
416:from falcon.middleware import CORSMiddleware
Now I have enough information to implement the middleware. Let me create the `RequestIDMiddleware` class:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/falcon/middleware.py
old_str
from __future__ import annotations

from collections.abc import Iterable
from typing import TYPE_CHECKING

from ._typing import UniversalMiddlewareWithProcessResponse

if TYPE_CHECKING:
    from .asgi.request import Request as AsgiRequest
    from .asgi.response import Response as AsgiResponse
    from .request import Request
    from .response import Response
new_str
from __future__ import annotations

from collections.abc import Iterable
from typing import TYPE_CHECKING
import uuid

from ._typing import UniversalMiddlewareWithProcessRequest
from ._typing import UniversalMiddlewareWithProcessResponse

if TYPE_CHECKING:
    from .asgi.request import Request as AsgiRequest
    from .asgi.response import Response as AsgiResponse
    from .request import Request
    from .response import Response

output
The file /tmp/inputs/falcon/middleware.py has been edited successfully.
Now let me add the `RequestIDMiddleware` class at the end of the file:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/falcon/middleware.py
old_str
    async def process_response_async(
        self,
        req: AsgiRequest,
        resp: AsgiResponse,
        resource: object,
        req_succeeded: bool,
    ) -> None:
        self.process_response(req, resp, resource, req_succeeded)
new_str
    async def process_response_async(
        self,
        req: AsgiRequest,
        resp: AsgiResponse,
        resource: object,
        req_succeeded: bool,
    ) -> None:
        self.process_response(req, resp, resource, req_succeeded)


class RequestIDMiddleware(
    UniversalMiddlewareWithProcessRequest,
    UniversalMiddlewareWithProcessResponse,
):
    """Request ID middleware.

    This middleware tracks a unique request identifier throughout the
    request-response cycle. It is useful for correlating log entries,
    tracing requests across multiple services, and debugging issues in
    distributed systems.

    For every incoming request, the middleware will:

    * Extract the request ID from the incoming request header (by default
      ``X-Request-ID``) if one is provided by the client.
    * Generate a new unique request ID (a random UUID) if one is not
      already present on the request.
    * Store the request ID on ``req.context`` so that it can be easily
      accessed from resource responders, hooks, and other middleware
      components (e.g., ``req.context.request_id``).
    * Echo the request ID back to the client on the response via the
      configured response header (by default ``X-Request-ID``).

    Example::

        import falcon

        app = falcon.App(middleware=[falcon.RequestIDMiddleware()])

        class ThingsResource:
            def on_get(self, req, resp):
                # Access the request ID assigned by the middleware.
                request_id = req.context.request_id

                # ... use request_id for logging, tracing, etc. ...
                resp.media = {'request_id': request_id}

    Keyword Arguments:
        header_name (str): Name of the header used to read the incoming
            request ID, as well as the header used to emit the request ID
            on the response (default ``'X-Request-ID'``).
        context_attr (str): Name of the attribute on ``req.context`` where
            the request ID will be stored (default ``'request_id'``).
        id_generator (callable): A zero-argument callable that returns a
            new request ID string. This can be customized to use an
            alternative ID scheme (for example, a ULID, a short random
            token, or a timestamp-based ID). By default, a random UUID4
            hex string is generated via :func:`uuid.uuid4`.
    """

    # NOTE(falcon): The X-Request-ID header is a widely-adopted de facto
    #   standard for propagating request identifiers between services.
    _DEFAULT_HEADER = 'X-Request-ID'
    _DEFAULT_CONTEXT_ATTR = 'request_id'

    def __init__(
        self,
        header_name: str = _DEFAULT_HEADER,
        context_attr: str = _DEFAULT_CONTEXT_ATTR,
        id_generator: object = None,
    ):
        self._header_name = header_name
        self._context_attr = context_attr

        if id_generator is None:
            # NOTE(falcon): uuid4() provides a random UUID which is ideal
            #   for correlation IDs -- collision probability is negligible
            #   and no coordination is required between nodes.
            self._id_generator = lambda: str(uuid.uuid4())
        else:
            self._id_generator = id_generator  # type: ignore[assignment]

    def process_request(self, req: Request, resp: Response) -> None:
        """Ensure every request has a request ID and store it on the context.

        If the incoming request already carries a request ID header, that
        value is reused (allowing upstream proxies or clients to supply
        their own correlation IDs). Otherwise, a new ID is generated.

        The resulting request ID is stored on ``req.context`` under the
        configured attribute name (default ``request_id``) so that it is
        available to downstream responders, hooks, and middleware.
        """

        request_id = req.get_header(self._header_name)

        if not request_id:
            # NOTE(falcon): Treat both missing headers and empty header
            #   values as "no request ID supplied" so that a blank
            #   X-Request-ID header does not propagate an empty string.
            request_id = self._id_generator()

        # NOTE(falcon): Use the mapping interface of Context so that a
        #   custom ``context_attr`` containing characters that are not
        #   valid Python identifiers is still supported.
        req.context[self._context_attr] = request_id

    def process_response(
        self, req: Request, resp: Response, resource: object, req_succeeded: bool
    ) -> None:
        """Add the request ID to the outgoing response headers.

        The request ID stored on ``req.context`` during request
        processing is echoed back to the client via the configured
        response header. If another component has already set the
        response header explicitly, the existing value is left intact.
        """

        # NOTE(falcon): process_request() is expected to have populated
        #   the request ID already. However, in edge cases where an
        #   earlier middleware short-circuits before process_request()
        #   runs (dependent stack mode), fall back gracefully rather
        #   than raising an AttributeError/KeyError here.
        request_id = req.context.get(self._context_attr)

        if request_id is None:
            return

        if resp.get_header(self._header_name) is None:
            resp.set_header(self._header_name, request_id)

    async def process_request_async(
        self, req: AsgiRequest, resp: AsgiResponse
    ) -> None:
        self.process_request(req, resp)

    async def process_response_async(
        self,
        req: AsgiRequest,
        resp: AsgiResponse,
        resource: object,
        req_succeeded: bool,
    ) -> None:
        self.process_response(req, resp, resource, req_succeeded)

output
The file /tmp/inputs/falcon/middleware.py has been edited successfully.
Now let me export the `RequestIDMiddleware` from the main `falcon` package:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/falcon/__init__.py
old_str
    'CORSMiddleware',
new_str
    'CORSMiddleware',
    'RequestIDMiddleware',

output
The file /tmp/inputs/falcon/__init__.py has been edited successfully.

str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/falcon/__init__.py
old_str
from falcon.middleware import CORSMiddleware
new_str
from falcon.middleware import CORSMiddleware
from falcon.middleware import RequestIDMiddleware

output
The file /tmp/inputs/falcon/__init__.py has been edited successfully.
Now let's verify the middleware compiles correctly and is importable:
bash
command
cd /tmp/inputs && python3 -c "
import falcon
print('RequestIDMiddleware:', falcon.RequestIDMiddleware)
print('CORSMiddleware:', falcon.CORSMiddleware)

# Check __all__ export
assert 'RequestIDMiddleware' in falcon.__all__, 'RequestIDMiddleware not in __all__'
print('RequestIDMiddleware is in __all__: OK')
"

output
RequestIDMiddleware: <class 'falcon.middleware.RequestIDMiddleware'>
CORSMiddleware: <class 'falcon.middleware.CORSMiddleware'>
RequestIDMiddleware is in __all__: OK
Let's do a quick sanity test of the middleware:
bash
command
cd /tmp/inputs && python3 -c "
import falcon
import falcon.testing as testing

# Test 1: WSGI with auto-generation
app = falcon.App(middleware=[falcon.RequestIDMiddleware()])

class TestResource:
    captured_req_id = None
    def on_get(self, req, resp):
        TestResource.captured_req_id = req.context.request_id
        resp.media = {'request_id': req.context.request_id}

app.add_route('/test', TestResource())
client = testing.TestClient(app)

# Without header -> should generate
result = client.simulate_get('/test')
print('=== Auto-gen (WSGI) ===')
print('Status:', result.status)
print('X-Request-ID response header:', result.headers.get('X-Request-ID'))
print('Captured from context:', TestResource.captured_req_id)
assert result.headers.get('X-Request-ID') == TestResource.captured_req_id
assert result.headers.get('X-Request-ID') is not None
assert len(result.headers.get('X-Request-ID')) == 36  # UUID string length
print('PASS')

# With header -> should reuse
print()
print('=== Client-supplied (WSGI) ===')
result = client.simulate_get('/test', headers={'X-Request-ID': 'my-custom-id-123'})
print('Status:', result.status)
print('X-Request-ID response header:', result.headers.get('X-Request-ID'))
print('Captured from context:', TestResource.captured_req_id)
assert result.headers.get('X-Request-ID') == 'my-custom-id-123'
assert TestResource.captured_req_id == 'my-custom-id-123'
print('PASS')
"

output
=== Auto-gen (WSGI) ===
Status: 200 OK
X-Request-ID response header: d542f7ea-80b1-485f-ac15-b3557ab19db6
Captured from context: d542f7ea-80b1-485f-ac15-b3557ab19db6
PASS

=== Client-supplied (WSGI) ===
Status: 200 OK
X-Request-ID response header: my-custom-id-123
Captured from context: my-custom-id-123
PASS

bash
command
cd /tmp/inputs && python3 -c "
import falcon
import falcon.asgi
import falcon.testing as testing

# Test ASGI version
app = falcon.asgi.App(middleware=[falcon.RequestIDMiddleware()])

class TestResource:
    captured_req_id = None
    async def on_get(self, req, resp):
        TestResource.captured_req_id = req.context.request_id
        resp.media = {'request_id': req.context.request_id}

app.add_route('/test', TestResource())
client = testing.TestClient(app)

# Without header -> should generate
print('=== Auto-gen (ASGI) ===')
result = client.simulate_get('/test')
print('Status:', result.status)
print('X-Request-ID response header:', result.headers.get('X-Request-ID'))
print('Captured from context:', TestResource.captured_req_id)
assert result.headers.get('X-Request-ID') == TestResource.captured_req_id
assert result.headers.get('X-Request-ID') is not None
print('PASS')

# With header -> should reuse
print()
print('=== Client-supplied (ASGI) ===')
result = client.simulate_get('/test', headers={'X-Request-ID': 'my-custom-id-456'})
print('Status:', result.status)
print('X-Request-ID response header:', result.headers.get('X-Request-ID'))
print('Captured from context:', TestResource.captured_req_id)
assert result.headers.get('X-Request-ID') == 'my-custom-id-456'
assert TestResource.captured_req_id == 'my-custom-id-456'
print('PASS')
"

output
=== Auto-gen (ASGI) ===
Status: 200 OK
X-Request-ID response header: 0f621c54-52da-41f4-a790-cd7ce7a74ea7
Captured from context: 0f621c54-52da-41f4-a790-cd7ce7a74ea7
PASS

=== Client-supplied (ASGI) ===
Status: 200 OK
X-Request-ID response header: my-custom-id-456
Captured from context: my-custom-id-456
PASS
Excellent! Both WSGI and ASGI versions work. Now let me create the test directory and the unit tests file:
bash
command
mkdir -p /tmp/inputs/test

system
Tool ran without output or errors

str_replace_based_edit_tool
command
create
path
/tmp/inputs/test/__init__.py
file_text
undefined

output
New file created successfully at /tmp/inputs/test/__init__.py
Now let me create the test file:
str_replace_based_edit_tool
command
create
path
/tmp/inputs/test/test_request_id_middleware.py
file_text
# Copyright 2024 by Falcon Contributors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Unit tests for :class:`falcon.RequestIDMiddleware`.

These tests exercise the request ID middleware in both the WSGI and ASGI
flavours of Falcon, verifying that:

* A request ID supplied by the client via the ``X-Request-ID`` header is
  honored and echoed back on the response.
* A new UUID is auto-generated when the client does not supply a request ID.
* The request ID is accessible inside resource responders via
  ``req.context.request_id``.
* The ``X-Request-ID`` header is always present on the outgoing response.
"""

import uuid

import pytest

import falcon
import falcon.asgi
from falcon import testing
from falcon.middleware import RequestIDMiddleware


# ---------------------------------------------------------------------------
# Fixtures & helpers
# ---------------------------------------------------------------------------


class _RecordingResource:
    """WSGI resource that records the request ID seen inside the responder."""

    def __init__(self):
        self.captured_request_id = None
        self.captured_context = None

    def on_get(self, req, resp):
        # NOTE: The middleware is expected to have populated the request
        #   ID on ``req.context`` before any responder executes.
        self.captured_request_id = req.context.request_id
        self.captured_context = req.context

        resp.media = {'request_id': req.context.request_id}


class _RecordingResourceAsync:
    """ASGI resource that records the request ID seen inside the responder."""

    def __init__(self):
        self.captured_request_id = None
        self.captured_context = None

    async def on_get(self, req, resp):
        self.captured_request_id = req.context.request_id
        self.captured_context = req.context

        resp.media = {'request_id': req.context.request_id}


def _create_app(asgi, middleware=None, resource=None):
    """Construct a WSGI or ASGI app wired with the request ID middleware.

    Returns a tuple of ``(client, resource)`` where ``client`` is a
    :class:`falcon.testing.TestClient` bound to the new app, and
    ``resource`` is the recording resource instance that was mounted
    at ``/``.
    """
    if middleware is None:
        middleware = [RequestIDMiddleware()]

    if asgi:
        app = falcon.asgi.App(middleware=middleware)
        resource = resource or _RecordingResourceAsync()
    else:
        app = falcon.App(middleware=middleware)
        resource = resource or _RecordingResource()

    app.add_route('/', resource)
    return testing.TestClient(app), resource


# NOTE(tests): Parametrize every test across both app flavours so that a
#   single set of assertions covers both the synchronous and asynchronous
#   middleware hooks.
@pytest.fixture(params=[False, True], ids=['wsgi', 'asgi'])
def asgi(request):
    return request.param


# ---------------------------------------------------------------------------
# Public API surface
# ---------------------------------------------------------------------------


def test_middleware_is_exported_from_falcon():
    """The middleware must be importable directly from the top-level package."""
    assert hasattr(falcon, 'RequestIDMiddleware')
    assert falcon.RequestIDMiddleware is RequestIDMiddleware
    assert 'RequestIDMiddleware' in falcon.__all__


# ---------------------------------------------------------------------------
# 1. Requests with an existing X-Request-ID header
# ---------------------------------------------------------------------------


def test_uses_client_supplied_request_id(asgi):
    """If the client sends X-Request-ID, that exact value must be preserved."""
    client, resource = _create_app(asgi)

    supplied_id = 'client-supplied-id-12345'
    result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})

    assert result.status_code == 200

    # Response header echoes the client-supplied value.
    assert result.headers.get('X-Request-ID') == supplied_id

    # The responder saw the same ID on req.context.
    assert resource.captured_request_id == supplied_id

    # The JSON body (populated by the responder from req.context) matches too.
    assert result.json == {'request_id': supplied_id}


def test_client_supplied_id_is_case_insensitive(asgi):
    """Header names are case-insensitive per RFC 7230."""
    client, resource = _create_app(asgi)

    supplied_id = 'abc-DEF-123'
    result = client.simulate_get('/', headers={'x-request-id': supplied_id})

    assert result.status_code == 200
    assert result.headers.get('X-Request-ID') == supplied_id
    assert resource.captured_request_id == supplied_id


def test_client_supplied_id_is_not_overwritten(asgi):
    """The middleware must never replace an existing client-supplied ID."""
    client, resource = _create_app(asgi)

    # NOTE: Send a value that clearly is *not* a UUID so we can distinguish
    #   between "reused" and "replaced with generated UUID" in assertions.
    supplied_id = 'definitely-not-a-uuid'
    result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})

    assert result.headers.get('X-Request-ID') == supplied_id
    assert resource.captured_request_id == supplied_id

    # Sanity: confirm it is NOT a generated UUID.
    with pytest.raises(ValueError):
        uuid.UUID(resource.captured_request_id)


# ---------------------------------------------------------------------------
# 2. Requests without a request ID -> auto-generation
# ---------------------------------------------------------------------------


def test_generates_request_id_when_not_provided(asgi):
    """A missing X-Request-ID header triggers auto-generation of a UUID."""
    client, resource = _create_app(asgi)

    result = client.simulate_get('/')

    assert result.status_code == 200

    generated_id = result.headers.get('X-Request-ID')
    assert generated_id is not None
    assert generated_id != ''

    # The generated ID must be a valid UUID4 string.
    parsed = uuid.UUID(generated_id)
    assert parsed.version == 4

    # The responder saw the same generated ID.
    assert resource.captured_request_id == generated_id


def test_generated_ids_are_unique_across_requests(asgi):
    """Each request without a supplied ID must get a fresh, unique UUID."""
    client, _ = _create_app(asgi)

    seen_ids = set()
    for _ in range(5):
        result = client.simulate_get('/')
        request_id = result.headers.get('X-Request-ID')
        assert request_id is not None
        assert request_id not in seen_ids, (
            'Generated request IDs must be unique per request'
        )
        seen_ids.add(request_id)

    assert len(seen_ids) == 5


def test_empty_header_triggers_generation(asgi):
    """An empty X-Request-ID header is treated as absent (a new ID is generated)."""
    client, resource = _create_app(asgi)

    result = client.simulate_get('/', headers={'X-Request-ID': ''})

    assert result.status_code == 200

    generated_id = result.headers.get('X-Request-ID')
    assert generated_id is not None
    assert generated_id != ''

    # Should be a valid UUID since it was auto-generated.
    uuid.UUID(generated_id)

    assert resource.captured_request_id == generated_id


# ---------------------------------------------------------------------------
# 3. Request ID is accessible via req.context
# ---------------------------------------------------------------------------


def test_request_id_available_on_context_attribute(asgi):
    """Responders must be able to read the ID via ``req.context.request_id``."""
    client, resource = _create_app(asgi)

    supplied_id = 'ctx-attribute-test'
    client.simulate_get('/', headers={'X-Request-ID': supplied_id})

    # Direct attribute access on the Context object.
    assert resource.captured_context.request_id == supplied_id

    # The same value is available via the mapping interface.
    assert resource.captured_context['request_id'] == supplied_id
    assert resource.captured_context.get('request_id') == supplied_id
    assert 'request_id' in resource.captured_context


def test_request_id_available_before_responder_runs(asgi):
    """The ID is populated during process_request, i.e. before routing."""
    client, resource = _create_app(asgi)

    result = client.simulate_get('/')
    assert result.status_code == 200

    # The responder captured a non-None value, proving that the middleware
    # populated req.context before on_get() was called.
    assert resource.captured_request_id is not None
    assert resource.captured_request_id == result.headers.get('X-Request-ID')


# ---------------------------------------------------------------------------
# 4. Response always includes the X-Request-ID header
# ---------------------------------------------------------------------------


def test_response_header_is_set_when_client_supplied(asgi):
    client, _ = _create_app(asgi)

    result = client.simulate_get('/', headers={'X-Request-ID': 'echo-me'})
    assert 'X-Request-ID' in result.headers
    assert result.headers['X-Request-ID'] == 'echo-me'


def test_response_header_is_set_when_auto_generated(asgi):
    client, _ = _create_app(asgi)

    result = client.simulate_get('/')
    assert 'X-Request-ID' in result.headers
    assert result.headers['X-Request-ID']  # non-empty


def test_response_header_is_set_for_unrouted_requests(asgi):
    """Even when no resource matches (404), the response must carry the ID."""
    client, _ = _create_app(asgi)

    result = client.simulate_get('/does-not-exist')
    assert result.status_code == 404
    assert 'X-Request-ID' in result.headers
    assert result.headers['X-Request-ID']  # non-empty


def test_response_header_is_set_for_unrouted_requests_client_supplied(asgi):
    """A client-supplied ID is echoed even on 404 responses."""
    client, _ = _create_app(asgi)

    supplied_id = 'trace-404-please'
    result = client.simulate_get(
        '/does-not-exist', headers={'X-Request-ID': supplied_id}
    )
    assert result.status_code == 404
    assert result.headers.get('X-Request-ID') == supplied_id


def test_response_header_is_set_on_error(asgi):
    """The request ID must still be echoed when a responder raises."""

    if asgi:
        class FailingResource:
            async def on_get(self, req, resp):
                raise falcon.HTTPInternalServerError()
    else:
        class FailingResource:
            def on_get(self, req, resp):
                raise falcon.HTTPInternalServerError()

    if asgi:
        app = falcon.asgi.App(middleware=[RequestIDMiddleware()])
    else:
        app = falcon.App(middleware=[RequestIDMiddleware()])

    app.add_route('/', FailingResource())
    client = testing.TestClient(app)

    supplied_id = 'trace-error-please'
    result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})

    assert result.status_code == 500
    assert result.headers.get('X-Request-ID') == supplied_id


def test_response_header_not_overridden_if_already_set(asgi):
    """If a responder sets X-Request-ID explicitly, honor that value."""

    if asgi:
        class OverridingResource:
            async def on_get(self, req, resp):
                resp.set_header('X-Request-ID', 'responder-set-id')
                resp.media = {'ok': True}
    else:
        class OverridingResource:
            def on_get(self, req, resp):
                resp.set_header('X-Request-ID', 'responder-set-id')
                resp.media = {'ok': True}

    if asgi:
        app = falcon.asgi.App(middleware=[RequestIDMiddleware()])
    else:
        app = falcon.App(middleware=[RequestIDMiddleware()])

    app.add_route('/', OverridingResource())
    client = testing.TestClient(app)

    result = client.simulate_get('/', headers={'X-Request-ID': 'client-id'})
    assert result.status_code == 200
    # The responder's value wins; middleware must not clobber it.
    assert result.headers.get('X-Request-ID') == 'responder-set-id'


# ---------------------------------------------------------------------------
# Configuration options
# ---------------------------------------------------------------------------


def test_custom_header_name(asgi):
    """The header name can be customized via the ``header_name`` argument."""

    mw = RequestIDMiddleware(header_name='X-Correlation-ID')
    client, resource = _create_app(asgi, middleware=[mw])

    supplied_id = 'my-correlation-id'
    result = client.simulate_get('/', headers={'X-Correlation-ID': supplied_id})

    assert result.status_code == 200
    assert result.headers.get('X-Correlation-ID') == supplied_id
    # Default header should NOT be set.
    assert result.headers.get('X-Request-ID') is None
    assert resource.captured_request_id == supplied_id


def test_custom_context_attr(asgi):
    """The context attribute name can be customized via ``context_attr``."""

    if asgi:
        class CustomAttrResource:
            captured = None

            async def on_get(self, req, resp):
                CustomAttrResource.captured = req.context.trace_id
                resp.media = {'trace_id': req.context.trace_id}
    else:
        class CustomAttrResource:
            captured = None

            def on_get(self, req, resp):
                CustomAttrResource.captured = req.context.trace_id
                resp.media = {'trace_id': req.context.trace_id}

    mw = RequestIDMiddleware(context_attr='trace_id')

    if asgi:
        app = falcon.asgi.App(middleware=[mw])
    else:
        app = falcon.App(middleware=[mw])

    app.add_route('/', CustomAttrResource())
    client = testing.TestClient(app)

    supplied_id = 'custom-attr-value'
    result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})

    assert result.status_code == 200
    assert CustomAttrResource.captured == supplied_id
    assert result.headers.get('X-Request-ID') == supplied_id


def test_custom_id_generator(asgi):
    """A custom ID generator can be supplied via the ``id_generator`` argument."""
    counter = {'n': 0}

    def gen():
        counter['n'] += 1
        return 'custom-id-{0}'.format(counter['n'])

    mw = RequestIDMiddleware(id_generator=gen)
    client, resource = _create_app(asgi, middleware=[mw])

    result = client.simulate_get('/')
    assert result.status_code == 200
    assert result.headers.get('X-Request-ID') == 'custom-id-1'
    assert resource.captured_request_id == 'custom-id-1'

    result = client.simulate_get('/')
    assert result.headers.get('X-Request-ID') == 'custom-id-2'
    assert resource.captured_request_id == 'custom-id-2'

    # A client-supplied value still takes precedence over the generator.
    result = client.simulate_get('/', headers={'X-Request-ID': 'client-wins'})
    assert result.headers.get('X-Request-ID') == 'client-wins'
    assert resource.captured_request_id == 'client-wins'
    # Generator was not invoked for this request.
    assert counter['n'] == 2

output
New file created successfully at /tmp/inputs/test/test_request_id_middleware.py
Let me also add a `conftest.py` to ensure the `falcon` package is on the path when running tests from the test directory:
str_replace_based_edit_tool
command
create
path
/tmp/inputs/test/conftest.py
file_text
"""Test configuration for the Falcon test suite.

Ensures that the in-tree ``falcon`` package (the parent directory of this
test folder) is discoverable on ``sys.path`` when tests are invoked
directly from the ``test`` directory.
"""

import os
import sys

# Ensure the parent directory (which contains the ``falcon`` package) is
# on sys.path so that ``import falcon`` resolves to the in-tree sources
# regardless of where pytest is invoked from.
_HERE = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_HERE)
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

output
New file created successfully at /tmp/inputs/test/conftest.py
Now let's run the tests:
bash
command
cd /tmp/inputs && python3 -m pytest test/test_request_id_middleware.py -v 2>&1

output
============================= test session starts ==============================
platform linux -- Python 3.9.7, pytest-6.2.4, py-1.10.0, pluggy-0.13.1 -- /opt/conda/bin/python3
cachedir: .pytest_cache
hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/inputs/.hypothesis/examples')
rootdir: /tmp/inputs
plugins: reportlog-0.3.0, hypothesis-6.75.3, cov-4.1.0, timeout-2.1.0, anyio-2.2.0
collecting ... collected 35 items

test/test_request_id_middleware.py::test_middleware_is_exported_from_falcon PASSED [  2%]
test/test_request_id_middleware.py::test_uses_client_supplied_request_id[wsgi] PASSED [  5%]
test/test_request_id_middleware.py::test_uses_client_supplied_request_id[asgi] PASSED [  8%]
test/test_request_id_middleware.py::test_client_supplied_id_is_case_insensitive[wsgi] PASSED [ 11%]
test/test_request_id_middleware.py::test_client_supplied_id_is_case_insensitive[asgi] PASSED [ 14%]
test/test_request_id_middleware.py::test_client_supplied_id_is_not_overwritten[wsgi] PASSED [ 17%]
test/test_request_id_middleware.py::test_client_supplied_id_is_not_overwritten[asgi] PASSED [ 20%]
test/test_request_id_middleware.py::test_generates_request_id_when_not_provided[wsgi] PASSED [ 22%]
test/test_request_id_middleware.py::test_generates_request_id_when_not_provided[asgi] PASSED [ 25%]
test/test_request_id_middleware.py::test_generated_ids_are_unique_across_requests[wsgi] PASSED [ 28%]
test/test_request_id_middleware.py::test_generated_ids_are_unique_across_requests[asgi] PASSED [ 31%]
test/test_request_id_middleware.py::test_empty_header_triggers_generation[wsgi] PASSED [ 34%]
test/test_request_id_middleware.py::test_empty_header_triggers_generation[asgi] PASSED [ 37%]
test/test_request_id_middleware.py::test_request_id_available_on_context_attribute[wsgi] PASSED [ 40%]
test/test_request_id_middleware.py::test_request_id_available_on_context_attribute[asgi] PASSED [ 42%]
test/test_request_id_middleware.py::test_request_id_available_before_responder_runs[wsgi] PASSED [ 45%]
test/test_request_id_middleware.py::test_request_id_available_before_responder_runs[asgi] PASSED [ 48%]
test/test_request_id_middleware.py::test_response_header_is_set_when_client_supplied[wsgi] PASSED [ 51%]
test/test_request_id_middleware.py::test_response_header_is_set_when_client_supplied[asgi] PASSED [ 54%]
test/test_request_id_middleware.py::test_response_header_is_set_when_auto_generated[wsgi] PASSED [ 57%]
test/test_request_id_middleware.py::test_response_header_is_set_when_auto_generated[asgi] PASSED [ 60%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[wsgi] PASSED [ 62%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[asgi] PASSED [ 65%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[wsgi] PASSED [ 68%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[asgi] PASSED [ 71%]
test/test_request_id_middleware.py::test_response_header_is_set_on_error[wsgi] PASSED [ 74%]
test/test_request_id_middleware.py::test_response_header_is_set_on_error[asgi] PASSED [ 77%]
test/test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[wsgi] PASSED [ 80%]
test/test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[asgi] PASSED [ 82%]
test/test_request_id_middleware.py::test_custom_header_name[wsgi] PASSED [ 85%]
test/test_request_id_middleware.py::test_custom_header_name[asgi] PASSED [ 88%]
test/test_request_id_middleware.py::test_custom_context_attr[wsgi] PASSED [ 91%]
test/test_request_id_middleware.py::test_custom_context_attr[asgi] PASSED [ 94%]
test/test_request_id_middleware.py::test_custom_id_generator[wsgi] PASSED [ 97%]
test/test_request_id_middleware.py::test_custom_id_generator[asgi] PASSED [100%]

============================== 35 passed in 1.18s ==============================
All 35 tests pass. Let me also verify the final middleware.py looks good and run tests from the test directory as well:
bash
command
cat /tmp/inputs/falcon/middleware.py

output
from __future__ import annotations

from collections.abc import Iterable
from typing import TYPE_CHECKING
import uuid

from ._typing import UniversalMiddlewareWithProcessRequest
from ._typing import UniversalMiddlewareWithProcessResponse

if TYPE_CHECKING:
from .asgi.request import Request as AsgiRequest
from .asgi.response import Response as AsgiResponse
from .request import Request
from .response import Response


class CORSMiddleware(UniversalMiddlewareWithProcessResponse):
"""CORS Middleware.

This middleware provides a simple out-of-the box CORS policy, including handling
of preflighted requests from the browser.

See also:

* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
* https://www.w3.org/TR/cors/#resource-processing-model

Note:
Falcon will automatically add OPTIONS responders if they are missing from the
responder instances added to the routes. When providing a custom ``on_options``
method, the ``Allow`` headers in the response should be set to the allowed
method values. If the ``Allow`` header is missing from the response,
this middleware will deny the preflight request.

This is also valid when using a sink function.

Keyword Arguments:
allow_origins (Union[str, Iterable[str]]): List of origins to allow (case
sensitive). The string ``'*'`` acts as a wildcard, matching every origin.
(default ``'*'``).
expose_headers (Optional[Union[str, Iterable[str]]]): List of additional
response headers to expose via the ``Access-Control-Expose-Headers``
header. These headers are in addition to the CORS-safelisted ones:
``Cache-Control``, ``Content-Language``, ``Content-Length``,
``Content-Type``, ``Expires``, ``Last-Modified``, ``Pragma``.
(default ``None``).

See also:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
allow_credentials (Optional[Union[str, Iterable[str]]]): List of origins
(case sensitive) for which to allow credentials via the
``Access-Control-Allow-Credentials`` header.
The string ``'*'`` acts as a wildcard, matching every allowed origin,
while ``None`` disallows all origins. This parameter takes effect only
if the origin is allowed by the ``allow_origins`` argument.
(default ``None``).
allow_private_network (bool):
If ``True``, the server includes the
``Access-Control-Allow-Private-Network`` header in responses to
CORS preflight (OPTIONS) requests. This indicates that the resource is
willing to respond to requests from less-public IP address spaces
(e.g., from public site to private device).
(default ``False``).

See also:
https://wicg.github.io/private-network-access/#private-network-request-heading
"""

def __init__(
self,
allow_origins: str | Iterable[str] = '*',
expose_headers: str | Iterable[str] | None = None,
allow_credentials: str | Iterable[str] | None = None,
allow_private_network: bool = False,
):
if allow_origins == '*':
self.allow_origins = allow_origins
else:
if isinstance(allow_origins, str):
allow_origins = [allow_origins]
self.allow_origins = frozenset(allow_origins)
if '*' in self.allow_origins:
raise ValueError(
'The wildcard string "*" may only be passed to allow_origins as a '
'string literal, not inside an iterable.'
)

if expose_headers is not None and not isinstance(expose_headers, str):
expose_headers = ', '.join(expose_headers)
self.expose_headers = expose_headers

if allow_credentials is None:
allow_credentials = frozenset()
elif allow_credentials != '*':
if isinstance(allow_credentials, str):
allow_credentials = [allow_credentials]
allow_credentials = frozenset(allow_credentials)
if '*' in allow_credentials:
raise ValueError(
'The wildcard string "*" may only be passed to allow_credentials '
'as a string literal, not inside an iterable.'
)
self.allow_credentials = allow_credentials
self.allow_private_network = allow_private_network

def process_response(
self, req: Request, resp: Response, resource: object, req_succeeded: bool
) -> None:
"""Implement the CORS policy for all routes.

This middleware provides a simple out-of-the box CORS policy,
including handling of preflighted requests from the browser.

See also: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

See also: https://www.w3.org/TR/cors/#resource-processing-model
"""

origin = req.get_header('Origin')
if origin is None:
return

if self.allow_origins != '*' and origin not in self.allow_origins:
return

if resp.get_header('Access-Control-Allow-Origin') is None:
set_origin = '*' if self.allow_origins == '*' else origin
if self.allow_credentials == '*' or origin in self.allow_credentials:
set_origin = origin
resp.set_header('Access-Control-Allow-Credentials', 'true')
resp.set_header('Access-Control-Allow-Origin', set_origin)

if self.expose_headers:
resp.set_header('Access-Control-Expose-Headers', self.expose_headers)

if (
req_succeeded
and req.method == 'OPTIONS'
and req.get_header('Access-Control-Request-Method')
):
# NOTE(kgriffs): This is a CORS preflight request. Patch the
#   response accordingly.

allow = resp.get_header('Allow')
resp.delete_header('Allow')

allow_headers = req.get_header(
'Access-Control-Request-Headers', default='*'
)

if allow is None:
# there is no allow set, remove all access control headers
resp.delete_header('Access-Control-Allow-Methods')
resp.delete_header('Access-Control-Allow-Headers')
resp.delete_header('Access-Control-Max-Age')
resp.delete_header('Access-Control-Expose-Headers')
resp.delete_header('Access-Control-Allow-Origin')
else:
resp.set_header('Access-Control-Allow-Methods', allow)
resp.set_header('Access-Control-Allow-Headers', allow_headers)
resp.set_header('Access-Control-Max-Age', '86400')  # 24 hours

if self.allow_private_network and (
req.get_header('Access-Control-Request-Private-Network') == 'true'
):
resp.set_header('Access-Control-Allow-Private-Network', 'true')

async def process_response_async(
self,
req: AsgiRequest,
resp: AsgiResponse,
resource: object,
req_succeeded: bool,
) -> None:
self.process_response(req, resp, resource, req_succeeded)


class RequestIDMiddleware(
UniversalMiddlewareWithProcessRequest,
UniversalMiddlewareWithProcessResponse,
):
"""Request ID middleware.

This middleware tracks a unique request identifier throughout the
request-response cycle. It is useful for correlating log entries,
tracing requests across multiple services, and debugging issues in
distributed systems.

For every incoming request, the middleware will:

* Extract the request ID from the incoming request header (by default
``X-Request-ID``) if one is provided by the client.
* Generate a new unique request ID (a random UUID) if one is not
already present on the request.
* Store the request ID on ``req.context`` so that it can be easily
accessed from resource responders, hooks, and other middleware
components (e.g., ``req.context.request_id``).
* Echo the request ID back to the client on the response via the
configured response header (by default ``X-Request-ID``).

Example::

import falcon

app = falcon.App(middleware=[falcon.RequestIDMiddleware()])

class ThingsResource:
def on_get(self, req, resp):
# Access the request ID assigned by the middleware.
request_id = req.context.request_id

# ... use request_id for logging, tracing, etc. ...
resp.media = {'request_id': request_id}

Keyword Arguments:
header_name (str): Name of the header used to read the incoming
request ID, as well as the header used to emit the request ID
on the response (default ``'X-Request-ID'``).
context_attr (str): Name of the attribute on ``req.context`` where
the request ID will be stored (default ``'request_id'``).
id_generator (callable): A zero-argument callable that returns a
new request ID string. This can be customized to use an
alternative ID scheme (for example, a ULID, a short random
token, or a timestamp-based ID). By default, a random UUID4
hex string is generated via :func:`uuid.uuid4`.
"""

# NOTE(falcon): The X-Request-ID header is a widely-adopted de facto
#   standard for propagating request identifiers between services.
_DEFAULT_HEADER = 'X-Request-ID'
_DEFAULT_CONTEXT_ATTR = 'request_id'

def __init__(
self,
header_name: str = _DEFAULT_HEADER,
context_attr: str = _DEFAULT_CONTEXT_ATTR,
id_generator: object = None,
):
self._header_name = header_name
self._context_attr = context_attr

if id_generator is None:
# NOTE(falcon): uuid4() provides a random UUID which is ideal
#   for correlation IDs -- collision probability is negligible
#   and no coordination is required between nodes.
self._id_generator = lambda: str(uuid.uuid4())
else:
self._id_generator = id_generator  # type: ignore[assignment]

def process_request(self, req: Request, resp: Response) -> None:
"""Ensure every request has a request ID and store it on the context.

If the incoming request already carries a request ID header, that
value is reused (allowing upstream proxies or clients to supply
their own correlation IDs). Otherwise, a new ID is generated.

The resulting request ID is stored on ``req.context`` under the
configured attribute name (default ``request_id``) so that it is
available to downstream responders, hooks, and middleware.
"""

request_id = req.get_header(self._header_name)

if not request_id:
# NOTE(falcon): Treat both missing headers and empty header
#   values as "no request ID supplied" so that a blank
#   X-Request-ID header does not propagate an empty string.
request_id = self._id_generator()

# NOTE(falcon): Use the mapping interface of Context so that a
#   custom ``context_attr`` containing characters that are not
#   valid Python identifiers is still supported.
req.context[self._context_attr] = request_id

def process_response(
self, req: Request, resp: Response, resource: object, req_succeeded: bool
) -> None:
"""Add the request ID to the outgoing response headers.

The request ID stored on ``req.context`` during request
processing is echoed back to the client via the configured
response header. If another component has already set the
response header explicitly, the existing value is left intact.
"""

# NOTE(falcon): process_request() is expected to have populated
#   the request ID already. However, in edge cases where an
#   earlier middleware short-circuits before process_request()
#   runs (dependent stack mode), fall back gracefully rather
#   than raising an AttributeError/KeyError here.
request_id = req.context.get(self._context_attr)

if request_id is None:
return

if resp.get_header(self._header_name) is None:
resp.set_header(self._header_name, request_id)

async def process_request_async(
self, req: AsgiRequest, resp: AsgiResponse
) -> None:
self.process_request(req, resp)

async def process_response_async(
self,
req: AsgiRequest,
resp: AsgiResponse,
resource: object,
req_succeeded: bool,
) -> None:
self.process_response(req, resp, resource, req_succeeded)

bash
command
# Also run from the test directory to confirm conftest.py works properly
cd /tmp/inputs/test && python3 -m pytest test_request_id_middleware.py -v 2>&1 | tail -20

output
test_request_id_middleware.py::test_response_header_is_set_when_client_supplied[wsgi] PASSED [ 51%]
test_request_id_middleware.py::test_response_header_is_set_when_client_supplied[asgi] PASSED [ 54%]
test_request_id_middleware.py::test_response_header_is_set_when_auto_generated[wsgi] PASSED [ 57%]
test_request_id_middleware.py::test_response_header_is_set_when_auto_generated[asgi] PASSED [ 60%]
test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[wsgi] PASSED [ 62%]
test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[asgi] PASSED [ 65%]
test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[wsgi] PASSED [ 68%]
test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[asgi] PASSED [ 71%]
test_request_id_middleware.py::test_response_header_is_set_on_error[wsgi] PASSED [ 74%]
test_request_id_middleware.py::test_response_header_is_set_on_error[asgi] PASSED [ 77%]
test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[wsgi] PASSED [ 80%]
test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[asgi] PASSED [ 82%]
test_request_id_middleware.py::test_custom_header_name[wsgi] PASSED      [ 85%]
test_request_id_middleware.py::test_custom_header_name[asgi] PASSED      [ 88%]
test_request_id_middleware.py::test_custom_context_attr[wsgi] PASSED     [ 91%]
test_request_id_middleware.py::test_custom_context_attr[asgi] PASSED     [ 94%]
test_request_id_middleware.py::test_custom_id_generator[wsgi] PASSED     [ 97%]
test_request_id_middleware.py::test_custom_id_generator[asgi] PASSED     [100%]

============================== 35 passed in 0.73s ==============================

bash
command
# Let's also make sure the Callable type hint for id_generator is correct
# Let's update it to use Callable type hint for better clarity
grep -n "Callable" /tmp/inputs/falcon/middleware.py

system
Tool ran without output or errors
Let me improve the type annotation of the `id_generator` parameter to be more precise using `Callable`:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/falcon/middleware.py
old_str
from collections.abc import Iterable
from typing import TYPE_CHECKING
import uuid
new_str
from collections.abc import Iterable
from typing import Callable, Optional, TYPE_CHECKING
import uuid

output
The file /tmp/inputs/falcon/middleware.py has been edited successfully.

str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/falcon/middleware.py
old_str
    def __init__(
        self,
        header_name: str = _DEFAULT_HEADER,
        context_attr: str = _DEFAULT_CONTEXT_ATTR,
        id_generator: object = None,
    ):
        self._header_name = header_name
        self._context_attr = context_attr

        if id_generator is None:
            # NOTE(falcon): uuid4() provides a random UUID which is ideal
            #   for correlation IDs -- collision probability is negligible
            #   and no coordination is required between nodes.
            self._id_generator = lambda: str(uuid.uuid4())
        else:
            self._id_generator = id_generator  # type: ignore[assignment]
new_str
    def __init__(
        self,
        header_name: str = _DEFAULT_HEADER,
        context_attr: str = _DEFAULT_CONTEXT_ATTR,
        id_generator: Optional[Callable[[], str]] = None,
    ):
        self._header_name = header_name
        self._context_attr = context_attr

        if id_generator is None:
            # NOTE(falcon): uuid4() provides a random UUID which is ideal
            #   for correlation IDs -- collision probability is negligible
            #   and no coordination is required between nodes.
            self._id_generator: Callable[[], str] = lambda: str(uuid.uuid4())
        else:
            self._id_generator = id_generator

output
The file /tmp/inputs/falcon/middleware.py has been edited successfully.

bash
command
cd /tmp/inputs && python3 -m pytest test/test_request_id_middleware.py -v 2>&1 | tail -15

output
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[asgi] PASSED [ 65%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[wsgi] PASSED [ 68%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[asgi] PASSED [ 71%]
test/test_request_id_middleware.py::test_response_header_is_set_on_error[wsgi] PASSED [ 74%]
test/test_request_id_middleware.py::test_response_header_is_set_on_error[asgi] PASSED [ 77%]
test/test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[wsgi] PASSED [ 80%]
test/test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[asgi] PASSED [ 82%]
test/test_request_id_middleware.py::test_custom_header_name[wsgi] PASSED [ 85%]
test/test_request_id_middleware.py::test_custom_header_name[asgi] PASSED [ 88%]
test/test_request_id_middleware.py::test_custom_context_attr[wsgi] PASSED [ 91%]
test/test_request_id_middleware.py::test_custom_context_attr[asgi] PASSED [ 94%]
test/test_request_id_middleware.py::test_custom_id_generator[wsgi] PASSED [ 97%]
test/test_request_id_middleware.py::test_custom_id_generator[asgi] PASSED [100%]

============================== 35 passed in 0.71s ==============================

bash
command
# Verify the full file structure & final middleware file
echo "=== Final middleware.py ==="
cat /tmp/inputs/falcon/middleware.py
echo ""
echo "=== __init__.py changes ==="
grep -n "RequestIDMiddleware" /tmp/inputs/falcon/__init__.py

output
=== Final middleware.py ===
from __future__ import annotations

from collections.abc import Iterable
from typing import Callable, Optional, TYPE_CHECKING
import uuid

from ._typing import UniversalMiddlewareWithProcessRequest
from ._typing import UniversalMiddlewareWithProcessResponse

if TYPE_CHECKING:
from .asgi.request import Request as AsgiRequest
from .asgi.response import Response as AsgiResponse
from .request import Request
from .response import Response


class CORSMiddleware(UniversalMiddlewareWithProcessResponse):
"""CORS Middleware.

This middleware provides a simple out-of-the box CORS policy, including handling
of preflighted requests from the browser.

See also:

* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
* https://www.w3.org/TR/cors/#resource-processing-model

Note:
Falcon will automatically add OPTIONS responders if they are missing from the
responder instances added to the routes. When providing a custom ``on_options``
method, the ``Allow`` headers in the response should be set to the allowed
method values. If the ``Allow`` header is missing from the response,
this middleware will deny the preflight request.

This is also valid when using a sink function.

Keyword Arguments:
allow_origins (Union[str, Iterable[str]]): List of origins to allow (case
sensitive). The string ``'*'`` acts as a wildcard, matching every origin.
(default ``'*'``).
expose_headers (Optional[Union[str, Iterable[str]]]): List of additional
response headers to expose via the ``Access-Control-Expose-Headers``
header. These headers are in addition to the CORS-safelisted ones:
``Cache-Control``, ``Content-Language``, ``Content-Length``,
``Content-Type``, ``Expires``, ``Last-Modified``, ``Pragma``.
(default ``None``).

See also:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
allow_credentials (Optional[Union[str, Iterable[str]]]): List of origins
(case sensitive) for which to allow credentials via the
``Access-Control-Allow-Credentials`` header.
The string ``'*'`` acts as a wildcard, matching every allowed origin,
while ``None`` disallows all origins. This parameter takes effect only
if the origin is allowed by the ``allow_origins`` argument.
(default ``None``).
allow_private_network (bool):
If ``True``, the server includes the
``Access-Control-Allow-Private-Network`` header in responses to
CORS preflight (OPTIONS) requests. This indicates that the resource is
willing to respond to requests from less-public IP address spaces
(e.g., from public site to private device).
(default ``False``).

See also:
https://wicg.github.io/private-network-access/#private-network-request-heading
"""

def __init__(
self,
allow_origins: str | Iterable[str] = '*',
expose_headers: str | Iterable[str] | None = None,
allow_credentials: str | Iterable[str] | None = None,
allow_private_network: bool = False,
):
if allow_origins == '*':
self.allow_origins = allow_origins
else:
if isinstance(allow_origins, str):
allow_origins = [allow_origins]
self.allow_origins = frozenset(allow_origins)
if '*' in self.allow_origins:
raise ValueError(
'The wildcard string "*" may only be passed to allow_origins as a '
'string literal, not inside an iterable.'
)

if expose_headers is not None and not isinstance(expose_headers, str):
expose_headers = ', '.join(expose_headers)
self.expose_headers = expose_headers

if allow_credentials is None:
allow_credentials = frozenset()
elif allow_credentials != '*':
if isinstance(allow_credentials, str):
allow_credentials = [allow_credentials]
allow_credentials = frozenset(allow_credentials)
if '*' in allow_credentials:
raise ValueError(
'The wildcard string "*" may only be passed to allow_credentials '
'as a string literal, not inside an iterable.'
)
self.allow_credentials = allow_credentials
self.allow_private_network = allow_private_network

def process_response(
self, req: Request, resp: Response, resource: object, req_succeeded: bool
) -> None:
"""Implement the CORS policy for all routes.

This middleware provides a simple out-of-the box CORS policy,
including handling of preflighted requests from the browser.

See also: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

See also: https://www.w3.org/TR/cors/#resource-processing-model
"""

origin = req.get_header('Origin')
if origin is None:
return

if self.allow_origins != '*' and origin not in self.allow_origins:
return

if resp.get_header('Access-Control-Allow-Origin') is None:
set_origin = '*' if self.allow_origins == '*' else origin
if self.allow_credentials == '*' or origin in self.allow_credentials:
set_origin = origin
resp.set_header('Access-Control-Allow-Credentials', 'true')
resp.set_header('Access-Control-Allow-Origin', set_origin)

if self.expose_headers:
resp.set_header('Access-Control-Expose-Headers', self.expose_headers)

if (
req_succeeded
and req.method == 'OPTIONS'
and req.get_header('Access-Control-Request-Method')
):
# NOTE(kgriffs): This is a CORS preflight request. Patch the
#   response accordingly.

allow = resp.get_header('Allow')
resp.delete_header('Allow')

allow_headers = req.get_header(
'Access-Control-Request-Headers', default='*'
)

if allow is None:
# there is no allow set, remove all access control headers
resp.delete_header('Access-Control-Allow-Methods')
resp.delete_header('Access-Control-Allow-Headers')
resp.delete_header('Access-Control-Max-Age')
resp.delete_header('Access-Control-Expose-Headers')
resp.delete_header('Access-Control-Allow-Origin')
else:
resp.set_header('Access-Control-Allow-Methods', allow)
resp.set_header('Access-Control-Allow-Headers', allow_headers)
resp.set_header('Access-Control-Max-Age', '86400')  # 24 hours

if self.allow_private_network and (
req.get_header('Access-Control-Request-Private-Network') == 'true'
):
resp.set_header('Access-Control-Allow-Private-Network', 'true')

async def process_response_async(
self,
req: AsgiRequest,
resp: AsgiResponse,
resource: object,
req_succeeded: bool,
) -> None:
self.process_response(req, resp, resource, req_succeeded)


class RequestIDMiddleware(
UniversalMiddlewareWithProcessRequest,
UniversalMiddlewareWithProcessResponse,
):
"""Request ID middleware.

This middleware tracks a unique request identifier throughout the
request-response cycle. It is useful for correlating log entries,
tracing requests across multiple services, and debugging issues in
distributed systems.

For every incoming request, the middleware will:

* Extract the request ID from the incoming request header (by default
``X-Request-ID``) if one is provided by the client.
* Generate a new unique request ID (a random UUID) if one is not
already present on the request.
* Store the request ID on ``req.context`` so that it can be easily
accessed from resource responders, hooks, and other middleware
components (e.g., ``req.context.request_id``).
* Echo the request ID back to the client on the response via the
configured response header (by default ``X-Request-ID``).

Example::

import falcon

app = falcon.App(middleware=[falcon.RequestIDMiddleware()])

class ThingsResource:
def on_get(self, req, resp):
# Access the request ID assigned by the middleware.
request_id = req.context.request_id

# ... use request_id for logging, tracing, etc. ...
resp.media = {'request_id': request_id}

Keyword Arguments:
header_name (str): Name of the header used to read the incoming
request ID, as well as the header used to emit the request ID
on the response (default ``'X-Request-ID'``).
context_attr (str): Name of the attribute on ``req.context`` where
the request ID will be stored (default ``'request_id'``).
id_generator (callable): A zero-argument callable that returns a
new request ID string. This can be customized to use an
alternative ID scheme (for example, a ULID, a short random
token, or a timestamp-based ID). By default, a random UUID4
hex string is generated via :func:`uuid.uuid4`.
"""

# NOTE(falcon): The X-Request-ID header is a widely-adopted de facto
#   standard for propagating request identifiers between services.
_DEFAULT_HEADER = 'X-Request-ID'
_DEFAULT_CONTEXT_ATTR = 'request_id'

def __init__(
self,
header_name: str = _DEFAULT_HEADER,
context_attr: str = _DEFAULT_CONTEXT_ATTR,
id_generator: Optional[Callable[[], str]] = None,
):
self._header_name = header_name
self._context_attr = context_attr

if id_generator is None:
# NOTE(falcon): uuid4() provides a random UUID which is ideal
#   for correlation IDs -- collision probability is negligible
#   and no coordination is required between nodes.
self._id_generator: Callable[[], str] = lambda: str(uuid.uuid4())
else:
self._id_generator = id_generator

def process_request(self, req: Request, resp: Response) -> None:
"""Ensure every request has a request ID and store it on the context.

If the incoming request already carries a request ID header, that
value is reused (allowing upstream proxies or clients to supply
their own correlation IDs). Otherwise, a new ID is generated.

The resulting request ID is stored on ``req.context`` under the
configured attribute name (default ``request_id``) so that it is
available to downstream responders, hooks, and middleware.
"""

request_id = req.get_header(self._header_name)

if not request_id:
# NOTE(falcon): Treat both missing headers and empty header
#   values as "no request ID supplied" so that a blank
#   X-Request-ID header does not propagate an empty string.
request_id = self._id_generator()

# NOTE(falcon): Use the mapping interface of Context so that a
#   custom ``context_attr`` containing characters that are not
#   valid Python identifiers is still supported.
req.context[self._context_attr] = request_id

def process_response(
self, req: Request, resp: Response, resource: object, req_succeeded: bool
) -> None:
"""Add the request ID to the outgoing response headers.

The request ID stored on ``req.context`` during request
processing is echoed back to the client via the configured
response header. If another component has already set the
response header explicitly, the existing value is left intact.
"""

# NOTE(falcon): process_request() is expected to have populated
#   the request ID already. However, in edge cases where an
#   earlier middleware short-circuits before process_request()
#   runs (dependent stack mode), fall back gracefully rather
#   than raising an AttributeError/KeyError here.
request_id = req.context.get(self._context_attr)

if request_id is None:
return

if resp.get_header(self._header_name) is None:
resp.set_header(self._header_name, request_id)

async def process_request_async(
self, req: AsgiRequest, resp: AsgiResponse
) -> None:
self.process_request(req, resp)

async def process_response_async(
self,
req: AsgiRequest,
resp: AsgiResponse,
resource: object,
req_succeeded: bool,
) -> None:
self.process_response(req, resp, resource, req_succeeded)

=== __init__.py changes ===
36:    'RequestIDMiddleware',
418:from falcon.middleware import RequestIDMiddleware

bash
command
# Let's also verify the test file contents
cat /tmp/inputs/test/test_request_id_middleware.py

output
# Copyright 2024 by Falcon Contributors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Unit tests for :class:`falcon.RequestIDMiddleware`.

These tests exercise the request ID middleware in both the WSGI and ASGI
flavours of Falcon, verifying that:

* A request ID supplied by the client via the ``X-Request-ID`` header is
honored and echoed back on the response.
* A new UUID is auto-generated when the client does not supply a request ID.
* The request ID is accessible inside resource responders via
``req.context.request_id``.
* The ``X-Request-ID`` header is always present on the outgoing response.
"""

import uuid

import pytest

import falcon
import falcon.asgi
from falcon import testing
from falcon.middleware import RequestIDMiddleware


# ---------------------------------------------------------------------------
# Fixtures & helpers
# ---------------------------------------------------------------------------


class _RecordingResource:
"""WSGI resource that records the request ID seen inside the responder."""

def __init__(self):
self.captured_request_id = None
self.captured_context = None

def on_get(self, req, resp):
# NOTE: The middleware is expected to have populated the request
#   ID on ``req.context`` before any responder executes.
self.captured_request_id = req.context.request_id
self.captured_context = req.context

resp.media = {'request_id': req.context.request_id}


class _RecordingResourceAsync:
"""ASGI resource that records the request ID seen inside the responder."""

def __init__(self):
self.captured_request_id = None
self.captured_context = None

async def on_get(self, req, resp):
self.captured_request_id = req.context.request_id
self.captured_context = req.context

resp.media = {'request_id': req.context.request_id}


def _create_app(asgi, middleware=None, resource=None):
"""Construct a WSGI or ASGI app wired with the request ID middleware.

Returns a tuple of ``(client, resource)`` where ``client`` is a
:class:`falcon.testing.TestClient` bound to the new app, and
``resource`` is the recording resource instance that was mounted
at ``/``.
"""
if middleware is None:
middleware = [RequestIDMiddleware()]

if asgi:
app = falcon.asgi.App(middleware=middleware)
resource = resource or _RecordingResourceAsync()
else:
app = falcon.App(middleware=middleware)
resource = resource or _RecordingResource()

app.add_route('/', resource)
return testing.TestClient(app), resource


# NOTE(tests): Parametrize every test across both app flavours so that a
#   single set of assertions covers both the synchronous and asynchronous
#   middleware hooks.
@pytest.fixture(params=[False, True], ids=['wsgi', 'asgi'])
def asgi(request):
return request.param


# ---------------------------------------------------------------------------
# Public API surface
# ---------------------------------------------------------------------------


def test_middleware_is_exported_from_falcon():
"""The middleware must be importable directly from the top-level package."""
assert hasattr(falcon, 'RequestIDMiddleware')
assert falcon.RequestIDMiddleware is RequestIDMiddleware
assert 'RequestIDMiddleware' in falcon.__all__


# ---------------------------------------------------------------------------
# 1. Requests with an existing X-Request-ID header
# ---------------------------------------------------------------------------


def test_uses_client_supplied_request_id(asgi):
"""If the client sends X-Request-ID, that exact value must be preserved."""
client, resource = _create_app(asgi)

supplied_id = 'client-supplied-id-12345'
result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})

assert result.status_code == 200

# Response header echoes the client-supplied value.
assert result.headers.get('X-Request-ID') == supplied_id

# The responder saw the same ID on req.context.
assert resource.captured_request_id == supplied_id

# The JSON body (populated by the responder from req.context) matches too.
assert result.json == {'request_id': supplied_id}


def test_client_supplied_id_is_case_insensitive(asgi):
"""Header names are case-insensitive per RFC 7230."""
client, resource = _create_app(asgi)

supplied_id = 'abc-DEF-123'
result = client.simulate_get('/', headers={'x-request-id': supplied_id})

assert result.status_code == 200
assert result.headers.get('X-Request-ID') == supplied_id
assert resource.captured_request_id == supplied_id


def test_client_supplied_id_is_not_overwritten(asgi):
"""The middleware must never replace an existing client-supplied ID."""
client, resource = _create_app(asgi)

# NOTE: Send a value that clearly is *not* a UUID so we can distinguish
#   between "reused" and "replaced with generated UUID" in assertions.
supplied_id = 'definitely-not-a-uuid'
result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})

assert result.headers.get('X-Request-ID') == supplied_id
assert resource.captured_request_id == supplied_id

# Sanity: confirm it is NOT a generated UUID.
with pytest.raises(ValueError):
uuid.UUID(resource.captured_request_id)


# ---------------------------------------------------------------------------
# 2. Requests without a request ID -> auto-generation
# ---------------------------------------------------------------------------


def test_generates_request_id_when_not_provided(asgi):
"""A missing X-Request-ID header triggers auto-generation of a UUID."""
client, resource = _create_app(asgi)

result = client.simulate_get('/')

assert result.status_code == 200

generated_id = result.headers.get('X-Request-ID')
assert generated_id is not None
assert generated_id != ''

# The generated ID must be a valid UUID4 string.
parsed = uuid.UUID(generated_id)
assert parsed.version == 4

# The responder saw the same generated ID.
assert resource.captured_request_id == generated_id


def test_generated_ids_are_unique_across_requests(asgi):
"""Each request without a supplied ID must get a fresh, unique UUID."""
client, _ = _create_app(asgi)

seen_ids = set()
for _ in range(5):
result = client.simulate_get('/')
request_id = result.headers.get('X-Request-ID')
assert request_id is not None
assert request_id not in seen_ids, (
'Generated request IDs must be unique per request'
)
seen_ids.add(request_id)

assert len(seen_ids) == 5


def test_empty_header_triggers_generation(asgi):
"""An empty X-Request-ID header is treated as absent (a new ID is generated)."""
client, resource = _create_app(asgi)

result = client.simulate_get('/', headers={'X-Request-ID': ''})

assert result.status_code == 200

generated_id = result.headers.get('X-Request-ID')
assert generated_id is not None
assert generated_id != ''

# Should be a valid UUID since it was auto-generated.
uuid.UUID(generated_id)

assert resource.captured_request_id == generated_id


# ---------------------------------------------------------------------------
# 3. Request ID is accessible via req.context
# ---------------------------------------------------------------------------


def test_request_id_available_on_context_attribute(asgi):
"""Responders must be able to read the ID via ``req.context.request_id``."""
client, resource = _create_app(asgi)

supplied_id = 'ctx-attribute-test'
client.simulate_get('/', headers={'X-Request-ID': supplied_id})

# Direct attribute access on the Context object.
assert resource.captured_context.request_id == supplied_id

# The same value is available via the mapping interface.
assert resource.captured_context['request_id'] == supplied_id
assert resource.captured_context.get('request_id') == supplied_id
assert 'request_id' in resource.captured_context


def test_request_id_available_before_responder_runs(asgi):
"""The ID is populated during process_request, i.e. before routing."""
client, resource = _create_app(asgi)

result = client.simulate_get('/')
assert result.status_code == 200

# The responder captured a non-None value, proving that the middleware
# populated req.context before on_get() was called.
assert resource.captured_request_id is not None
assert resource.captured_request_id == result.headers.get('X-Request-ID')


# ---------------------------------------------------------------------------
# 4. Response always includes the X-Request-ID header
# ---------------------------------------------------------------------------


def test_response_header_is_set_when_client_supplied(asgi):
client, _ = _create_app(asgi)

result = client.simulate_get('/', headers={'X-Request-ID': 'echo-me'})
assert 'X-Request-ID' in result.headers
assert result.headers['X-Request-ID'] == 'echo-me'


def test_response_header_is_set_when_auto_generated(asgi):
client, _ = _create_app(asgi)

result = client.simulate_get('/')
assert 'X-Request-ID' in result.headers
assert result.headers['X-Request-ID']  # non-empty


def test_response_header_is_set_for_unrouted_requests(asgi):
"""Even when no resource matches (404), the response must carry the ID."""
client, _ = _create_app(asgi)

result = client.simulate_get('/does-not-exist')
assert result.status_code == 404
assert 'X-Request-ID' in result.headers
assert result.headers['X-Request-ID']  # non-empty


def test_response_header_is_set_for_unrouted_requests_client_supplied(asgi):
"""A client-supplied ID is echoed even on 404 responses."""
client, _ = _create_app(asgi)

supplied_id = 'trace-404-please'
result = client.simulate_get(
'/does-not-exist', headers={'X-Request-ID': supplied_id}
)
assert result.status_code == 404
assert result.headers.get('X-Request-ID') == supplied_id


def test_response_header_is_set_on_error(asgi):
"""The request ID must still be echoed when a responder raises."""

if asgi:
class FailingResource:
async def on_get(self, req, resp):
raise falcon.HTTPInternalServerError()
else:
class FailingResource:
def on_get(self, req, resp):
raise falcon.HTTPInternalServerError()

if asgi:
app = falcon.asgi.App(middleware=[RequestIDMiddleware()])
else:
app = falcon.App(middleware=[RequestIDMiddleware()])

app.add_route('/', FailingResource())
client = testing.TestClient(app)

supplied_id = 'trace-error-please'
result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})

assert result.status_code == 500
assert result.headers.get('X-Request-ID') == supplied_id


def test_response_header_not_overridden_if_already_set(asgi):
"""If a responder sets X-Request-ID explicitly, honor that value."""

if asgi:
class OverridingResource:
async def on_get(self, req, resp):
resp.set_header('X-Request-ID', 'responder-set-id')
resp.media = {'ok': True}
else:
class OverridingResource:
def on_get(self, req, resp):
resp.set_header('X-Request-ID', 'responder-set-id')
resp.media = {'ok': True}

if asgi:
app = falcon.asgi.App(middleware=[RequestIDMiddleware()])
else:
app = falcon.App(middleware=[RequestIDMiddleware()])

app.add_route('/', OverridingResource())
client = testing.TestClient(app)

result = client.simulate_get('/', headers={'X-Request-ID': 'client-id'})
assert result.status_code == 200
# The responder's value wins; middleware must not clobber it.
assert result.headers.get('X-Request-ID') == 'responder-set-id'


# ---------------------------------------------------------------------------
# Configuration options
# ---------------------------------------------------------------------------


def test_custom_header_name(asgi):
"""The header name can be customized via the ``header_name`` argument."""

mw = RequestIDMiddleware(header_name='X-Correlation-ID')
client, resource = _create_app(asgi, middleware=[mw])

supplied_id = 'my-correlation-id'
result = client.simulate_get('/', headers={'X-Correlation-ID': supplied_id})

assert result.status_code == 200
assert result.headers.get('X-Correlation-ID') == supplied_id
# Default header should NOT be set.
assert result.headers.get('X-Request-ID') is None
assert resource.captured_request_id == supplied_id


def test_custom_context_attr(asgi):
"""The context attribute name can be customized via ``context_attr``."""

if asgi:
class CustomAttrResource:
captured = None

async def on_get(self, req, resp):
CustomAttrResource.captured = req.context.trace_id
resp.media = {'trace_id': req.context.trace_id}
else:
class CustomAttrResource:
captured = None

def on_get(self, req, resp):
CustomAttrResource.captured = req.context.trace_id
resp.media = {'trace_id': req.context.trace_id}

mw = RequestIDMiddleware(context_attr='trace_id')

if asgi:
app = falcon.asgi.App(middleware=[mw])
else:
app = falcon.App(middleware=[mw])

app.add_route('/', CustomAttrResource())
client = testing.TestClient(app)

supplied_id = 'custom-attr-value'
result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})

assert result.status_code == 200
assert CustomAttrResource.captured == supplied_id
assert result.headers.get('X-Request-ID') == supplied_id


def test_custom_id_generator(asgi):
"""A custom ID generator can be supplied via the ``id_generator`` argument."""
counter = {'n': 0}

def gen():
counter['n'] += 1
return 'custom-id-{0}'.format(counter['n'])

mw = RequestIDMiddleware(id_generator=gen)
client, resource = _create_app(asgi, middleware=[mw])

result = client.simulate_get('/')
assert result.status_code == 200
assert result.headers.get('X-Request-ID') == 'custom-id-1'
assert resource.captured_request_id == 'custom-id-1'

result = client.simulate_get('/')
assert result.headers.get('X-Request-ID') == 'custom-id-2'
assert resource.captured_request_id == 'custom-id-2'

# A client-supplied value still takes precedence over the generator.
result = client.simulate_get('/', headers={'X-Request-ID': 'client-wins'})
assert result.headers.get('X-Request-ID') == 'client-wins'
assert resource.captured_request_id == 'client-wins'
# Generator was not invoked for this request.
assert counter['n'] == 2

bash
command
# Final comprehensive test run
cd /tmp/inputs && python3 -m pytest test/test_request_id_middleware.py -v --tb=short 2>&1

output
============================= test session starts ==============================
platform linux -- Python 3.9.7, pytest-6.2.4, py-1.10.0, pluggy-0.13.1 -- /opt/conda/bin/python3
cachedir: .pytest_cache
hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/inputs/.hypothesis/examples')
rootdir: /tmp/inputs
plugins: reportlog-0.3.0, hypothesis-6.75.3, cov-4.1.0, timeout-2.1.0, anyio-2.2.0
collecting ... collected 35 items

test/test_request_id_middleware.py::test_middleware_is_exported_from_falcon PASSED [  2%]
test/test_request_id_middleware.py::test_uses_client_supplied_request_id[wsgi] PASSED [  5%]
test/test_request_id_middleware.py::test_uses_client_supplied_request_id[asgi] PASSED [  8%]
test/test_request_id_middleware.py::test_client_supplied_id_is_case_insensitive[wsgi] PASSED [ 11%]
test/test_request_id_middleware.py::test_client_supplied_id_is_case_insensitive[asgi] PASSED [ 14%]
test/test_request_id_middleware.py::test_client_supplied_id_is_not_overwritten[wsgi] PASSED [ 17%]
test/test_request_id_middleware.py::test_client_supplied_id_is_not_overwritten[asgi] PASSED [ 20%]
test/test_request_id_middleware.py::test_generates_request_id_when_not_provided[wsgi] PASSED [ 22%]
test/test_request_id_middleware.py::test_generates_request_id_when_not_provided[asgi] PASSED [ 25%]
test/test_request_id_middleware.py::test_generated_ids_are_unique_across_requests[wsgi] PASSED [ 28%]
test/test_request_id_middleware.py::test_generated_ids_are_unique_across_requests[asgi] PASSED [ 31%]
test/test_request_id_middleware.py::test_empty_header_triggers_generation[wsgi] PASSED [ 34%]
test/test_request_id_middleware.py::test_empty_header_triggers_generation[asgi] PASSED [ 37%]
test/test_request_id_middleware.py::test_request_id_available_on_context_attribute[wsgi] PASSED [ 40%]
test/test_request_id_middleware.py::test_request_id_available_on_context_attribute[asgi] PASSED [ 42%]
test/test_request_id_middleware.py::test_request_id_available_before_responder_runs[wsgi] PASSED [ 45%]
test/test_request_id_middleware.py::test_request_id_available_before_responder_runs[asgi] PASSED [ 48%]
test/test_request_id_middleware.py::test_response_header_is_set_when_client_supplied[wsgi] PASSED [ 51%]
test/test_request_id_middleware.py::test_response_header_is_set_when_client_supplied[asgi] PASSED [ 54%]
test/test_request_id_middleware.py::test_response_header_is_set_when_auto_generated[wsgi] PASSED [ 57%]
test/test_request_id_middleware.py::test_response_header_is_set_when_auto_generated[asgi] PASSED [ 60%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[wsgi] PASSED [ 62%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[asgi] PASSED [ 65%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[wsgi] PASSED [ 68%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[asgi] PASSED [ 71%]
test/test_request_id_middleware.py::test_response_header_is_set_on_error[wsgi] PASSED [ 74%]
test/test_request_id_middleware.py::test_response_header_is_set_on_error[asgi] PASSED [ 77%]
test/test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[wsgi] PASSED [ 80%]
test/test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[asgi] PASSED [ 82%]
test/test_request_id_middleware.py::test_custom_header_name[wsgi] PASSED [ 85%]
test/test_request_id_middleware.py::test_custom_header_name[asgi] PASSED [ 88%]
test/test_request_id_middleware.py::test_custom_context_attr[wsgi] PASSED [ 91%]
test/test_request_id_middleware.py::test_custom_context_attr[asgi] PASSED [ 94%]
test/test_request_id_middleware.py::test_custom_id_generator[wsgi] PASSED [ 97%]
test/test_request_id_middleware.py::test_custom_id_generator[asgi] PASSED [100%]

============================== 35 passed in 0.68s ==============================

bash
command
# Quick summary of all the files I created/modified
echo "======================================"
echo "SUMMARY OF CHANGES"
echo "======================================"
echo ""
echo "=== 1. Modified: /tmp/inputs/falcon/middleware.py ==="
echo "    - Added 'uuid' import"
echo "    - Added 'Callable, Optional' imports from typing"
echo "    - Added 'UniversalMiddlewareWithProcessRequest' import"
echo "    - Added 'RequestIDMiddleware' class (~130 lines)"
echo ""
echo "=== 2. Modified: /tmp/inputs/falcon/__init__.py ==="
echo "    - Added 'RequestIDMiddleware' to __all__"
echo "    - Added 'from falcon.middleware import RequestIDMiddleware'"
echo ""
echo "=== 3. Created: /tmp/inputs/test/__init__.py ==="
echo "    - Empty package marker"
echo ""
echo "=== 4. Created: /tmp/inputs/test/conftest.py ==="
echo "    - Path setup for in-tree falcon imports"
echo ""
echo "=== 5. Created: /tmp/inputs/test/test_request_id_middleware.py ==="
echo "    - 35 passing tests (WSGI + ASGI parametrized)"
echo ""
echo "======================================"
echo "File tree:"
echo "======================================"
ls -la /tmp/inputs/test/
echo ""
echo "Line counts:"
wc -l /tmp/inputs/falcon/middleware.py /tmp/inputs/test/test_request_id_middleware.py

output
======================================
SUMMARY OF CHANGES
======================================

=== 1. Modified: /tmp/inputs/falcon/middleware.py ===
- Added 'uuid' import
- Added 'Callable, Optional' imports from typing
- Added 'UniversalMiddlewareWithProcessRequest' import
- Added 'RequestIDMiddleware' class (~130 lines)

=== 2. Modified: /tmp/inputs/falcon/__init__.py ===
- Added 'RequestIDMiddleware' to __all__
- Added 'from falcon.middleware import RequestIDMiddleware'

=== 3. Created: /tmp/inputs/test/__init__.py ===
- Empty package marker

=== 4. Created: /tmp/inputs/test/conftest.py ===
- Path setup for in-tree falcon imports

=== 5. Created: /tmp/inputs/test/test_request_id_middleware.py ===
- 35 passing tests (WSGI + ASGI parametrized)

======================================
File tree:
======================================
total 17
drwxr-xr-x 4 argocd root   140 Feb 27 21:19 .
drwxr-xr-x 5 argocd root   100 Feb 27 21:18 ..
drwxr-xr-x 3 argocd root   120 Feb 27 21:19 .pytest_cache
-rw-r--r-- 1 argocd root     0 Feb 27 21:16 __init__.py
drwxr-xr-x 2 argocd root   100 Feb 27 21:18 __pycache__
-rw-r--r-- 1 argocd root   586 Feb 27 21:18 conftest.py
-rw-r--r-- 1 argocd root 15513 Feb 27 21:18 test_request_id_middleware.py

Line counts:
311 /tmp/inputs/falcon/middleware.py
442 /tmp/inputs/test/test_request_id_middleware.py
753 total
All 35 tests pass. Here's a summary of what was implemented:

---

## Summary

### 1. **`falcon/middleware.py`** — Added `RequestIDMiddleware` class

The middleware follows the exact same pattern as `CORSMiddleware`:

- Inherits from `UniversalMiddlewareWithProcessRequest` and `UniversalMiddlewareWithProcessResponse` protocols (universal = works with both WSGI and ASGI).
- Implements **`process_request()`** — extracts `X-Request-ID` from incoming headers, or generates a fresh UUID4 if absent/empty, then stores it on `req.context.request_id`.
- Implements **`process_response()`** — echoes the request ID back on the response as an `X-Request-ID` header (unless a responder has already set that header explicitly).
- Implements **`process_request_async()`** / **`process_response_async()`** — thin async wrappers that delegate to the sync implementations (identical pattern to `CORSMiddleware`).

**Configurable knobs** (all keyword arguments):
| Argument | Default | Purpose |
|---|---|---|
| `header_name` | `'X-Request-ID'` | Header used for both reading and writing the ID |
| `context_attr` | `'request_id'` | Attribute name on `req.context` |
| `id_generator` | `lambda: str(uuid.uuid4())` | Custom ID factory |

### 2. **`falcon/__init__.py`** — Export from main package
- Added `'RequestIDMiddleware'` to `__all__`
- Added `from falcon.middleware import RequestIDMiddleware`

### 3. **`test/test_request_id_middleware.py`** — 35 passing tests

Every test is parametrized across both **WSGI** and **ASGI** app flavours. Coverage includes:

| Requirement | Tests |
|---|---|
| **1. Requests with existing `X-Request-ID`** | `test_uses_client_supplied_request_id`, `test_client_supplied_id_is_case_insensitive`, `test_client_supplied_id_is_not_overwritten` |
| **2. Auto-generation when no ID present** | `test_generates_request_id_when_not_provided` (validates UUID4 format), `test_generated_ids_are_unique_across_requests`, `test_empty_header_triggers_generation` |
| **3. Accessible via `req.context`** | `test_request_id_available_on_context_attribute` (tests both attribute and mapping access), `test_request_id_available_before_responder_runs` |
| **4. Response includes `X-Request-ID` header** | `test_response_header_is_set_when_client_supplied`, `test_response_header_is_set_when_auto_generated`, `test_response_header_is_set_for_unrouted_requests` (404s), `test_response_header_is_set_on_error` (500s), `test_response_header_not_overridden_if_already_set` |
| **Bonus: Configuration** | `test_custom_header_name`, `test_custom_context_attr`, `test_custom_id_generator`, `test_middleware_is_exported_from_falcon` |