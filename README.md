#Mode A
Let me start by thoroughly exploring the existing codebase before writing a single line of code.
bash
command
find /tmp/inputs/falcon -type f | sort

output
/tmp/inputs/falcon/__init__.py
/tmp/inputs/falcon/_typing.py
/tmp/inputs/falcon/app.py
/tmp/inputs/falcon/app_helpers.py
/tmp/inputs/falcon/asgi/__init__.py
/tmp/inputs/falcon/asgi/_asgi_helpers.py
/tmp/inputs/falcon/asgi/_request_helpers.py
/tmp/inputs/falcon/asgi/app.py
/tmp/inputs/falcon/asgi/multipart.py
/tmp/inputs/falcon/asgi/reader.py
/tmp/inputs/falcon/asgi/request.py
/tmp/inputs/falcon/asgi/response.py
/tmp/inputs/falcon/asgi/stream.py
/tmp/inputs/falcon/asgi/structures.py
/tmp/inputs/falcon/asgi/ws.py
/tmp/inputs/falcon/asgi_spec.py
/tmp/inputs/falcon/bench/__init__.py
/tmp/inputs/falcon/bench/bench.py
/tmp/inputs/falcon/bench/create.py
/tmp/inputs/falcon/bench/dj/__init__.py
/tmp/inputs/falcon/bench/dj/dj/__init__.py
/tmp/inputs/falcon/bench/dj/dj/settings.py
/tmp/inputs/falcon/bench/dj/dj/urls.py
/tmp/inputs/falcon/bench/dj/dj/wsgi.py
/tmp/inputs/falcon/bench/dj/hello/__init__.py
/tmp/inputs/falcon/bench/dj/hello/admin.py
/tmp/inputs/falcon/bench/dj/hello/apps.py
/tmp/inputs/falcon/bench/dj/hello/migrations/__init__.py
/tmp/inputs/falcon/bench/dj/hello/models.py
/tmp/inputs/falcon/bench/dj/hello/tests.py
/tmp/inputs/falcon/bench/dj/hello/views.py
/tmp/inputs/falcon/bench/dj/manage.py
/tmp/inputs/falcon/bench/nuts/MANIFEST.in
/tmp/inputs/falcon/bench/nuts/__init__.py
/tmp/inputs/falcon/bench/nuts/config.py
/tmp/inputs/falcon/bench/nuts/nuts/__init__.py
/tmp/inputs/falcon/bench/nuts/nuts/app.py
/tmp/inputs/falcon/bench/nuts/nuts/controllers/__init__.py
/tmp/inputs/falcon/bench/nuts/nuts/controllers/root.py
/tmp/inputs/falcon/bench/nuts/nuts/model/__init__.py
/tmp/inputs/falcon/bench/nuts/nuts/templates/error.html
/tmp/inputs/falcon/bench/nuts/nuts/templates/index.html
/tmp/inputs/falcon/bench/nuts/nuts/templates/layout.html
/tmp/inputs/falcon/bench/nuts/nuts/tests/__init__.py
/tmp/inputs/falcon/bench/nuts/nuts/tests/config.py
/tmp/inputs/falcon/bench/nuts/nuts/tests/test_functional.py
/tmp/inputs/falcon/bench/nuts/nuts/tests/test_units.py
/tmp/inputs/falcon/bench/nuts/public/css/style.css
/tmp/inputs/falcon/bench/nuts/public/images/logo.png
/tmp/inputs/falcon/bench/nuts/setup.cfg
/tmp/inputs/falcon/bench/nuts/setup.py
/tmp/inputs/falcon/bench/queues/__init__.py
/tmp/inputs/falcon/bench/queues/api.py
/tmp/inputs/falcon/bench/queues/claims.py
/tmp/inputs/falcon/bench/queues/messages.py
/tmp/inputs/falcon/bench/queues/queues.py
/tmp/inputs/falcon/bench/queues/stats.py
/tmp/inputs/falcon/cmd/__init__.py
/tmp/inputs/falcon/cmd/bench.py
/tmp/inputs/falcon/cmd/inspect_app.py
/tmp/inputs/falcon/constants.py
/tmp/inputs/falcon/cyutil/__init__.py
/tmp/inputs/falcon/cyutil/misc.pyx
/tmp/inputs/falcon/cyutil/reader.pyx
/tmp/inputs/falcon/cyutil/uri.pyx
/tmp/inputs/falcon/errors.py
/tmp/inputs/falcon/forwarded.py
/tmp/inputs/falcon/hooks.py
/tmp/inputs/falcon/http_error.py
/tmp/inputs/falcon/http_status.py
/tmp/inputs/falcon/inspect.py
/tmp/inputs/falcon/media/__init__.py
/tmp/inputs/falcon/media/base.py
/tmp/inputs/falcon/media/handlers.py
/tmp/inputs/falcon/media/json.py
/tmp/inputs/falcon/media/msgpack.py
/tmp/inputs/falcon/media/multipart.py
/tmp/inputs/falcon/media/urlencoded.py
/tmp/inputs/falcon/media/validators/__init__.py
/tmp/inputs/falcon/media/validators/jsonschema.py
/tmp/inputs/falcon/middleware.py
/tmp/inputs/falcon/py.typed
/tmp/inputs/falcon/redirects.py
/tmp/inputs/falcon/request.py
/tmp/inputs/falcon/request_helpers.py
/tmp/inputs/falcon/responders.py
/tmp/inputs/falcon/response.py
/tmp/inputs/falcon/response_helpers.py
/tmp/inputs/falcon/routing/__init__.py
/tmp/inputs/falcon/routing/compiled.py
/tmp/inputs/falcon/routing/converters.py
/tmp/inputs/falcon/routing/static.py
/tmp/inputs/falcon/routing/util.py
/tmp/inputs/falcon/status_codes.py
/tmp/inputs/falcon/stream.py
/tmp/inputs/falcon/testing/__init__.py
/tmp/inputs/falcon/testing/client.py
/tmp/inputs/falcon/testing/helpers.py
/tmp/inputs/falcon/testing/resource.py
/tmp/inputs/falcon/testing/srmock.py
/tmp/inputs/falcon/testing/test_case.py
/tmp/inputs/falcon/typing.py
/tmp/inputs/falcon/uri.py
/tmp/inputs/falcon/util/__init__.py
/tmp/inputs/falcon/util/deprecation.py
/tmp/inputs/falcon/util/mediatypes.py
/tmp/inputs/falcon/util/misc.py
/tmp/inputs/falcon/util/reader.py
/tmp/inputs/falcon/util/structures.py
/tmp/inputs/falcon/util/sync.py
/tmp/inputs/falcon/util/time.py
/tmp/inputs/falcon/util/uri.py
/tmp/inputs/falcon/version.py

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
cat /tmp/inputs/falcon/request.py

output
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

"""Request class."""

from __future__ import annotations

from collections.abc import Iterable
from collections.abc import Mapping
from datetime import date as py_date
from datetime import datetime
from io import BytesIO
from typing import (
Any,
Callable,
ClassVar,
Literal,
overload,
TextIO,
TypeVar,
)
from uuid import UUID
import warnings

from falcon import errors
from falcon import request_helpers as helpers
from falcon import util
from falcon._typing import _UNSET
from falcon._typing import StoreArg
from falcon._typing import UnsetOr
from falcon.constants import DEFAULT_MEDIA_TYPE
from falcon.constants import FALSE_STRINGS
from falcon.constants import MEDIA_JSON
from falcon.constants import TRUE_STRINGS
from falcon.forwarded import _parse_forwarded_header
from falcon.forwarded import Forwarded
from falcon.media import Handlers
from falcon.media.json import _DEFAULT_JSON_HANDLER
from falcon.stream import BoundedStream
from falcon.typing import ReadableIO
from falcon.util import deprecation
from falcon.util import ETag
from falcon.util import mediatypes
from falcon.util import structures
from falcon.util.uri import parse_host
from falcon.util.uri import parse_query_string

DEFAULT_ERROR_LOG_FORMAT = '{0:%Y-%m-%d %H:%M:%S} [FALCON] [ERROR] {1} {2}{3} => '

WSGI_CONTENT_HEADERS = frozenset(['CONTENT_TYPE', 'CONTENT_LENGTH'])

_PARAM_VALUE_DELIMITERS = {
',': ',',
'|': '|',
' ': ' ',
'pipeDelimited': '|',
'spaceDelimited': ' ',
}

# PERF(kgriffs): Avoid an extra namespace lookup when using these functions
strptime = datetime.strptime
now = datetime.now

_T = TypeVar('_T')


class Request:
"""Represents a client's HTTP request.

Note:
`Request` is not meant to be instantiated directly by responders.

Args:
env (dict): A WSGI environment dict passed in from the server. See
also PEP-3333.

Keyword Arguments:
options (RequestOptions): Set of global options passed from the App handler.
"""

__slots__ = (
'__dict__',
'_bounded_stream',
'_cached_access_route',
'_cached_forwarded',
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
``process_request()`` middleware method in order to influence
routing. If the original request path was URL encoded, it will
be decoded before being returned by this attribute.
"""
query_string: str
"""Query string portion of the request URI, without the preceding
'?' character.
"""
uri_template: str | None
"""The template for the route that was matched for
this request. May be ``None`` if the request has not yet been
routed, as would be the case for ``process_request()`` middleware
methods. May also be ``None`` if your app uses a custom routing
engine and the engine does not provide the URI template when
resolving a route.
"""
content_type: str | None
"""Value of the Content-Type header, or ``None`` if the header is missing."""
stream: ReadableIO
"""File-like input object for reading the body of the
request, if any. This object provides direct access to the
server's data stream and is non-seekable. In order to
avoid unintended side effects, and to provide maximum
flexibility to the application, Falcon itself does not
buffer or spool the data in any way.

Since this object is provided by the WSGI
server itself, rather than by Falcon, it may behave
differently depending on how you host your app. For example,
attempting to read more bytes than are expected (as
determined by the Content-Length header) may or may not
block indefinitely. It's a good idea to test your WSGI
server to find out how it behaves.

This can be particularly problematic when a request body is
expected, but none is given. In this case, the following
call blocks under certain WSGI servers::

# Blocks if Content-Length is 0
data = req.stream.read()

The workaround is fairly straightforward, if verbose::

# If Content-Length happens to be 0, or the header is
# missing altogether, this will not block.
data = req.stream.read(req.content_length or 0)

Alternatively, when passing the stream directly to a
consumer, it may be necessary to branch off the
value of the Content-Length header::

if req.content_length:
doc = json.load(req.stream)

For a slight performance cost, you may instead wish to use
:attr:`bounded_stream`, which wraps the native WSGI
input object to normalize its behavior.

Note:
If an HTML form is POSTed to the API using the
*application/x-www-form-urlencoded* media type, and
the :attr:`~.RequestOptions.auto_parse_form_urlencoded`
option is set, the framework
will consume `stream` in order to parse the parameters
and merge them into the query string parameters. In this
case, the stream will be left at EOF.
"""
options: RequestOptions
"""Set of global options passed from the App handler."""
is_websocket: bool
"""Always ``False`` in a sync ``Request``."""

def __init__(
self, env: dict[str, Any], options: RequestOptions | None = None
) -> None:
self.is_websocket: bool = False

self.env = env
self.options = options if options is not None else RequestOptions()

self._wsgierrors: TextIO = env['wsgi.errors']
self.method = env['REQUEST_METHOD']

self.uri_template = None
self._media: UnsetOr[Any] = _UNSET
self._media_error: Exception | None = None

# NOTE(kgriffs): PEP 3333 specifies that PATH_INFO may be the
# empty string, so normalize it in that case.
path: str = env['PATH_INFO'] or '/'

# PEP 3333 specifies that the PATH_INFO variable is always
# "bytes tunneled as latin-1" and must be encoded back.
#
# NOTE(kgriffs): The decoded path may contain UTF-8 characters.
# But according to the WSGI spec, no strings can contain chars
# outside ISO-8859-1. Therefore, to reconcile the URI
# encoding standard that allows UTF-8 with the WSGI spec
# that does not, WSGI servers tunnel the string via
# ISO-8859-1, e.g.:
#
#   tunnelled_path = path.encode('utf-8').decode('iso-8859-1')

# perf(vytas): Only decode the tunnelled path in case it is not ASCII.
#   For ASCII-strings, the below decoding chain is a no-op.
if not path.isascii():
path = path.encode('iso-8859-1').decode('utf-8', 'replace')

if (
self.options.strip_url_path_trailing_slash
and len(path) != 1
and path.endswith('/')
):
self.path: str = path[:-1]
else:
self.path = path

# PERF(ueg1990): try/catch cheaper and faster (and more Pythonic)
try:
self.query_string = env['QUERY_STRING']
except KeyError:
self.query_string = ''
self._params: dict[str, str | list[str]] = {}
else:
if self.query_string:
self._params = parse_query_string(
self.query_string,
keep_blank=self.options.keep_blank_qs_values,
csv=self.options.auto_parse_qs_csv,
)

else:
self._params = {}

self._cached_access_route: list[str] | None = None
self._cached_forwarded: list[Forwarded] | None = None
self._cached_forwarded_prefix: str | None = None
self._cached_forwarded_uri: str | None = None
self._cached_headers: dict[str, str] | None = None
self._cached_headers_lower: dict[str, str] | None = None
self._cached_prefix: str | None = None
self._cached_relative_uri: str | None = None
self._cached_uri: str | None = None

try:
self.content_type = self.env['CONTENT_TYPE']
except KeyError:
self.content_type = None

self.stream = env['wsgi.input']
self._bounded_stream: BoundedStream | None = None  # Lazy wrapping

# PERF(kgriffs): Technically, we should spend a few more
# cycles and parse the content type for real, but
# this heuristic will work virtually all the time.
if (
self.options._auto_parse_form_urlencoded
and self.content_type is not None
and 'application/x-www-form-urlencoded' in self.content_type
and
# NOTE(kgriffs): Within HTTP, a payload for a GET or HEAD
# request has no defined semantics, so we don't expect a
# body in those cases. We would normally not expect a body
# for OPTIONS either, but RFC 7231 does allow for it.
self.method not in ('GET', 'HEAD')
):
self._parse_form_urlencoded()

self.context = self.context_type()

def __repr__(self) -> str:
return '<%s: %s %r>' % (self.__class__.__name__, self.method, self.url)

# ------------------------------------------------------------------------
# Properties
# ------------------------------------------------------------------------

auth: str | None = helpers._header_property('HTTP_AUTHORIZATION')
"""Value of the Authorization header, or ``None`` if the header is missing."""
expect: str | None = helpers._header_property('HTTP_EXPECT')
"""Value of the Expect header, or ``None`` if the header is missing."""
if_range: str | None = helpers._header_property('HTTP_IF_RANGE')
"""Value of the If-Range header, or ``None`` if the header is missing."""
last_event_id: str | None = helpers._header_property('HTTP_LAST_EVENT_ID')
"""Value of the Last-Event-ID header, or ``None`` if the header is missing."""
referer: str | None = helpers._header_property('HTTP_REFERER')
"""Value of the Referer header, or ``None`` if the header is missing."""
user_agent: str | None = helpers._header_property('HTTP_USER_AGENT')
"""Value of the User-Agent header, or ``None`` if the header is missing."""

@property
def forwarded(self) -> list[Forwarded] | None:
"""Value of the Forwarded header, as a parsed list
of :class:`falcon.Forwarded` objects, or ``None`` if the header
is missing. If the header value is malformed, Falcon will
make a best effort to parse what it can.

(See also: RFC 7239, Section 4)
"""  # noqa: D205
# PERF(kgriffs): We could DRY up this memoization pattern using
# a decorator, but that would incur additional overhead without
# resorting to some trickery to rewrite the body of the method
# itself (vs. simply wrapping it with some memoization logic).
# At some point we might look into this but I don't think
# it's worth it right now.
if self._cached_forwarded is None:
forwarded = self.get_header('Forwarded')
if forwarded is None:
return None

self._cached_forwarded = _parse_forwarded_header(forwarded)

return self._cached_forwarded

@property
def client_accepts_json(self) -> bool:
"""``True`` if the Accept header indicates that the client is
willing to receive JSON, otherwise ``False``.
"""  # noqa: D205
return self.client_accepts('application/json')

@property
def client_accepts_msgpack(self) -> bool:
"""``True`` if the Accept header indicates that the client is
willing to receive MessagePack, otherwise ``False``.
"""  # noqa: D205
return self.client_accepts('application/x-msgpack') or self.client_accepts(
'application/msgpack'
)

@property
def client_accepts_xml(self) -> bool:
"""``True`` if the Accept header indicates that the client is
willing to receive XML, otherwise ``False``.
"""  # noqa: D205
return self.client_accepts('application/xml')

@property
def accept(self) -> str:
"""Value of the Accept header, or ``'*/*'`` if the header is missing."""
# NOTE(kgriffs): Per RFC, a missing accept header is
# equivalent to '*/*'
try:
return self.env['HTTP_ACCEPT'] or '*/*'
except KeyError:
return '*/*'

@property
def content_length(self) -> int | None:
"""Value of the Content-Length header converted to an ``int``.

Returns ``None`` if the header is missing.
"""
try:
value = self.env['CONTENT_LENGTH']
except KeyError:
return None

# NOTE(kgriffs): Normalize an empty value to behave as if
# the header were not included; wsgiref, at least, inserts
# an empty CONTENT_LENGTH value if the request does not
# set the header. Gunicorn and uWSGI do not do this, but
# others might if they are trying to match wsgiref's
# behavior too closely.
if not value:
return None

try:
value_as_int = int(value)
except ValueError:
msg = 'The value of the header must be a number.'
raise errors.HTTPInvalidHeader(msg, 'Content-Length')

if value_as_int < 0:
msg = 'The value of the header must be a positive number.'
raise errors.HTTPInvalidHeader(msg, 'Content-Length')

return value_as_int

@property
def bounded_stream(self) -> BoundedStream:
"""File-like wrapper around `stream` to normalize
certain differences between the native input objects
employed by different WSGI servers. In particular,
`bounded_stream` is aware of the expected Content-Length of
the body, and will never block on out-of-bounds reads,
assuming the client does not stall while transmitting the
data to the server.

For example, the following will not block when
Content-Length is 0 or the header is missing altogether::

data = req.bounded_stream.read()

This is also safe::

doc = json.load(req.bounded_stream)
"""  # noqa: D205
if self._bounded_stream is None:
self._bounded_stream = self._get_wrapped_wsgi_input()

return self._bounded_stream

@property
def date(self) -> datetime | None:
"""Value of the Date header, converted to a ``datetime`` instance.

The header value is assumed to conform to RFC 1123.

.. versionchanged:: 4.0
This property now returns timezone-aware
:class:`~datetime.datetime` objects (or ``None``).
"""
return self.get_header_as_datetime('Date')

@property
def if_match(self) -> list[ETag | Literal['*']] | None:
"""Value of the If-Match header, as a parsed list of
:class:`falcon.ETag` objects or ``None`` if the header is missing
or its value is blank.

This property provides a list of all ``entity-tags`` in the
header, both strong and weak, in the same order as listed in
the header.

(See also: RFC 7232, Section 3.1)
"""  # noqa: D205
# TODO(kgriffs): It may make sense at some point to create a
#   header property generator that DRY's up the memoization
#   pattern for us.
if self._cached_if_match is _UNSET:
header_value = self.env.get('HTTP_IF_MATCH')
if header_value:
self._cached_if_match = helpers._parse_etags(header_value)
else:
self._cached_if_match = None

return self._cached_if_match

@property
def if_none_match(self) -> list[ETag | Literal['*']] | None:
"""Value of the If-None-Match header, as a parsed
list of :class:`falcon.ETag` objects or ``None`` if the header is
missing or its value is blank.

This property provides a list of all ``entity-tags`` in the
header, both strong and weak, in the same order as listed in
the header.

(See also: RFC 7232, Section 3.2)
"""  # noqa: D205
if self._cached_if_none_match is _UNSET:
header_value = self.env.get('HTTP_IF_NONE_MATCH')
if header_value:
self._cached_if_none_match = helpers._parse_etags(header_value)
else:
self._cached_if_none_match = None

return self._cached_if_none_match

@property
def if_modified_since(self) -> datetime | None:
"""Value of the If-Modified-Since header.

Returns ``None`` if the header is missing.

.. versionchanged:: 4.0
This property now returns timezone-aware
:class:`~datetime.datetime` objects (or ``None``).
"""
return self.get_header_as_datetime('If-Modified-Since')

@property
def if_unmodified_since(self) -> datetime | None:
"""Value of the If-Unmodified-Since header.

Returns ``None`` if the header is missing.

.. versionchanged:: 4.0
This property now returns timezone-aware
:class:`~datetime.datetime` objects (or ``None``).
"""
return self.get_header_as_datetime('If-Unmodified-Since')

@property
def range(self) -> tuple[int, int] | None:
"""A 2-member ``tuple`` parsed from the value of the
Range header, or ``None`` if the header is missing.

The two members correspond to the first and last byte
positions of the requested resource, inclusive. Negative
indices indicate offset from the end of the resource,
where -1 is the last byte, -2 is the second-to-last byte,
and so forth.

Only continuous ranges are supported (e.g., "bytes=0-0,-1" would
result in an HTTPBadRequest exception when the attribute is
accessed).
"""  # noqa: D205
value = self.get_header('Range')
if value is None:
return None

if '=' in value:
unit, sep, req_range = value.partition('=')
else:
msg = "The value must be prefixed with a range unit, e.g. 'bytes='"
raise errors.HTTPInvalidHeader(msg, 'Range')

if ',' in req_range:
msg = 'The value must be a continuous range.'
raise errors.HTTPInvalidHeader(msg, 'Range')

try:
first, sep, last = req_range.partition('-')

if not sep:
raise ValueError()

if first and last:
first_num, last_num = (int(first), int(last))
if last_num < first_num:
raise ValueError()
elif first:
first_num, last_num = (int(first), -1)
elif last:
first_num, last_num = (-int(last), -1)
if first_num >= 0:
raise ValueError()
else:
msg = 'The range offsets are missing.'
raise errors.HTTPInvalidHeader(msg, 'Range')

return first_num, last_num

except ValueError:
href = 'https://tools.ietf.org/html/rfc7233'
href_text = 'HTTP/1.1 Range Requests'
msg = 'It must be a range formatted according to RFC 7233.'
raise errors.HTTPInvalidHeader(msg, 'Range', href=href, href_text=href_text)

@property
def range_unit(self) -> str | None:
"""Unit of the range parsed from the value of the Range header.

Returns ``None`` if the header is missing.
"""
value = self.get_header('Range')
if value is None:
return None

if value and '=' in value:
unit, sep, req_range = value.partition('=')
return unit
else:
msg = "The value must be prefixed with a range unit, e.g. 'bytes='"
raise errors.HTTPInvalidHeader(msg, 'Range')

@property
def root_path(self) -> str:
"""The initial portion of the request URI's path that
corresponds to the application object, so that the
application knows its virtual "location". This may be an
empty string, if the application corresponds to the "root"
of the server.

(In WSGI it corresponds to the "SCRIPT_NAME" environ variable defined
by PEP-3333; in ASGI it Corresponds to the "root_path" ASGI HTTP
scope field.)
"""  # noqa: D205
# PERF(kgriffs): try..except is faster than get() assuming that
# we normally expect the key to exist. Even though PEP-3333
# allows WSGI servers to omit the key when the value is an
# empty string, uwsgi, gunicorn, waitress, and wsgiref all
# include it even in that case.
try:
return self.env['SCRIPT_NAME']
except KeyError:
return ''

@property
# NOTE(caselit): Deprecated long ago. Warns since 4.0.
@deprecation.deprecated(
'Use `root_path` instead. '
'(This compatibility alias will be removed in Falcon 5.0.)',
is_property=True,
)
def app(self) -> str:
"""Deprecated alias for :attr:`root_path`."""
return self.root_path

@property
def scheme(self) -> str:
"""URL scheme used for the request. Either 'http' or 'https'.

Note:
If the request was proxied, the scheme may not
match what was originally requested by the client.
:attr:`forwarded_scheme` can be used, instead,
to handle such cases.
"""
return self.env['wsgi.url_scheme']

@property
def forwarded_scheme(self) -> str:
"""Original URL scheme requested by the user agent, if the request was proxied.

Typical values are 'http' or 'https'.

The following request headers are checked, in order of
preference, to determine the forwarded scheme:

- ``Forwarded``
- ``X-Forwarded-For``

If none of these headers are available, or if the
Forwarded header is available but does not contain a
"proto" parameter in the first hop, the value of
:attr:`scheme` is returned instead.

(See also: RFC 7239, Section 1)
"""
# PERF(kgriffs): Since the Forwarded header is still relatively
# new, we expect X-Forwarded-Proto to be more common, so
# try to avoid calling self.forwarded if we can, since it uses a
# try...catch that will usually result in a relatively expensive
# raised exception.
if 'HTTP_FORWARDED' in self.env:
forwarded = self.forwarded
if forwarded:
# Use first hop, fall back on own scheme
scheme = forwarded[0].scheme or self.scheme
else:
scheme = self.scheme
else:
# PERF(kgriffs): This call should normally succeed, so
# just go for it without wasting time checking it
# first. Note also that the indexing operator is
# slightly faster than using get().
try:
scheme = self.env['HTTP_X_FORWARDED_PROTO'].lower()
except KeyError:
scheme = self.env['wsgi.url_scheme']

return scheme

@property
def uri(self) -> str:
"""The fully-qualified URI for the request."""
if self._cached_uri is None:
# PERF: For small numbers of items, '+' is faster
# than ''.join(...). Concatenation is also generally
# faster than formatting.
value = self.scheme + '://' + self.netloc + self.relative_uri

self._cached_uri = value

return self._cached_uri

url = uri
"""Alias for :attr:`Request.uri`."""

@property
def forwarded_uri(self) -> str:
"""Original URI for proxied requests.

Uses :attr:`forwarded_scheme` and :attr:`forwarded_host` in order
to reconstruct the original URI requested by the user agent.
"""
if self._cached_forwarded_uri is None:
# PERF: For small numbers of items, '+' is faster
# than ''.join(...). Concatenation is also generally
# faster than formatting.
value = (
self.forwarded_scheme + '://' + self.forwarded_host + self.relative_uri
)

self._cached_forwarded_uri = value

return self._cached_forwarded_uri

@property
def relative_uri(self) -> str:
"""The path and query string portion of the
request URI, omitting the scheme and host.
"""  # noqa: D205
if self._cached_relative_uri is None:
if self.query_string:
self._cached_relative_uri = (
self.root_path + self.path + '?' + self.query_string
)
else:
self._cached_relative_uri = self.root_path + self.path

return self._cached_relative_uri

@property
def prefix(self) -> str:
"""The prefix of the request URI, including scheme,
host, and app :attr:`~.root_path` (if any).
"""  # noqa: D205
if self._cached_prefix is None:
self._cached_prefix = self.scheme + '://' + self.netloc + self.root_path

return self._cached_prefix

@property
def forwarded_prefix(self) -> str:
"""The prefix of the original URI for proxied requests.

Uses :attr:`forwarded_scheme` and :attr:`forwarded_host` in order
to reconstruct the original URI.
"""
if self._cached_forwarded_prefix is None:
self._cached_forwarded_prefix = (
self.forwarded_scheme + '://' + self.forwarded_host + self.root_path
)

return self._cached_forwarded_prefix

@property
def host(self) -> str:
"""Host request header field."""
try:
# NOTE(kgriffs): Prefer the host header; the web server
# isn't supposed to mess with it, so it should be what
# the client actually sent.
host_header = self.env['HTTP_HOST']
host, port = parse_host(host_header)
except KeyError:
# PERF(kgriffs): According to PEP-3333, this header
# will always be present.
host = self.env['SERVER_NAME']

return host

@property
def forwarded_host(self) -> str:
"""Original host request header as received
by the first proxy in front of the application server.

The following request headers are checked, in order of
preference, to determine the forwarded host:

- ``Forwarded``
- ``X-Forwarded-Host``

If none of the above headers are available, or if the
Forwarded header is available but the "host"
parameter is not included in the first hop, the value of
:attr:`host` is returned instead.

Note:
Reverse proxies are often configured to set the Host
header directly to the one that was originally
requested by the user agent; in that case, using
:attr:`host` is sufficient.

(See also: RFC 7239, Section 4)
"""  # noqa: D205
# PERF(kgriffs): Since the Forwarded header is still relatively
# new, we expect X-Forwarded-Host to be more common, so
# try to avoid calling self.forwarded if we can, since it uses a
# try...catch that will usually result in a relatively expensive
# raised exception.
if 'HTTP_FORWARDED' in self.env:
forwarded = self.forwarded
if forwarded:
# Use first hop, fall back on self
host = forwarded[0].host or self.netloc
else:
host = self.netloc
else:
# PERF(kgriffs): This call should normally succeed, assuming
# that the caller is expecting a forwarded header, so
# just go for it without wasting time checking it
# first.
try:
host = self.env['HTTP_X_FORWARDED_HOST']
except KeyError:
host = self.netloc

return host

@property
def subdomain(self) -> str | None:
"""Leftmost (i.e., most specific) subdomain from the hostname.

If only a single domain name is given, `subdomain` will be ``None``.

Note:
If the hostname in the request is an IP address, the value
for `subdomain` is undefined.
"""
# PERF(kgriffs): .partition is slightly faster than .split
subdomain, sep, remainder = self.host.partition('.')
return subdomain if sep else None

@property
def headers(self) -> Mapping[str, str]:
"""Raw HTTP headers from the request with dash-separated
names normalized to uppercase.

Note:
This property differs from the ASGI version of ``Request.headers``
in that the latter returns *lowercase* names. Middleware, such
as tracing and logging components, that need to be compatible with
both WSGI and ASGI apps should use :attr:`headers_lower` instead.

Warning:
Parsing all the headers to create this dict is done the first
time this attribute is accessed, and the returned object should
be treated as read-only. Note that this parsing can be costly,
so unless you need all the headers in this format, you should
instead use the ``get_header()`` method or one of the
convenience attributes to get a value for a specific header.
"""  # noqa: D205
if self._cached_headers is None:
headers = self._cached_headers = {}

for name, value in self.env.items():
if name.startswith('HTTP_'):
# NOTE(kgriffs): Don't take the time to fix the case
# since headers are supposed to be case-insensitive
# anyway.
headers[name[5:].replace('_', '-')] = value

elif name in WSGI_CONTENT_HEADERS:
headers[name.replace('_', '-')] = value

return self._cached_headers

@property
def headers_lower(self) -> Mapping[str, str]:
"""Same as :attr:`headers` except header names are normalized to lowercase.

.. versionadded:: 4.0
"""
if self._cached_headers_lower is None:
self._cached_headers_lower = {
key.lower(): value for key, value in self.headers.items()
}

return self._cached_headers_lower

@property
def params(self) -> Mapping[str, str | list[str]]:
"""The mapping of request query parameter names to their values.

Where the parameter appears multiple times in the query
string, the value mapped to that parameter key will be a list of
all the values in the order seen.
"""
return self._params

@property
def cookies(self) -> Mapping[str, str]:
"""A dict of name/value cookie pairs.

The returned object should be treated as read-only to avoid unintended
side-effects. If a cookie appears more than once in the request, only
the first value encountered will be made available here.

See also: :meth:`~falcon.Request.get_cookie_values` or
:meth:`~falcon.asgi.Request.get_cookie_values`.
"""
if self._cookies_collapsed is None:
if self._cookies is None:
header_value = self.get_header('Cookie')
if header_value:
self._cookies = helpers._parse_cookie_header(header_value)
else:
self._cookies = {}

self._cookies_collapsed = {n: v[0] for n, v in self._cookies.items()}

return self._cookies_collapsed

@property
def access_route(self) -> list[str]:
"""IP address of the original client, as well
as any known addresses of proxies fronting the WSGI server.

The following request headers are checked, in order of
preference, to determine the addresses:

- ``Forwarded``
- ``X-Forwarded-For``
- ``X-Real-IP``

If none of these headers are available, the value of
:attr:`~.remote_addr` is used instead.

Note:
Per `RFC 7239`_, the access route may contain "unknown"
and obfuscated identifiers, in addition to IPv4 and
IPv6 addresses

.. _RFC 7239: https://tools.ietf.org/html/rfc7239

Warning:
Headers can be forged by any client or proxy. Use this
property with caution and validate all values before
using them. Do not rely on the access route to authorize
requests.
"""  # noqa: D205
if self._cached_access_route is None:
# NOTE(kgriffs): Try different headers in order of
# preference; if none are found, fall back to REMOTE_ADDR.
#
# If one of these headers is present, but its value is
# malformed such that we end up with an empty list, or
# a non-empty list containing malformed values, go ahead
# and return the results as-is. The alternative would be
# to fall back to another header or to REMOTE_ADDR, but
# that only masks the problem; the operator needs to be
# aware that an upstream proxy is malfunctioning.

if 'HTTP_FORWARDED' in self.env:
self._cached_access_route = []
for hop in self.forwarded or ():
if hop.src is not None:
host, __ = parse_host(hop.src)
self._cached_access_route.append(host)
elif 'HTTP_X_FORWARDED_FOR' in self.env:
addresses = self.env['HTTP_X_FORWARDED_FOR'].split(',')
self._cached_access_route = [ip.strip() for ip in addresses]
elif 'HTTP_X_REAL_IP' in self.env:
self._cached_access_route = [self.env['HTTP_X_REAL_IP']]
< truncated lines 1000-1561 >
...ot an integer (default
``False``).
min_value (int): Set to the minimum value allowed for this
param. If the param is found and it is less than min_value, an
``HTTPError`` is raised.
max_value (int): Set to the maximum value allowed for this
param. If the param is found and its value is greater than
max_value, an ``HTTPError`` is raised.
store (dict): A ``dict``-like object in which to place
the value of the param, but only if the param is found
(default ``None``).
default (any): If the param is not found returns the
given value instead of ``None``

Returns:
int: The value of the param if it is found and can be converted to
an ``int``. If the param is not found, returns ``None``, unless
`required` is ``True``.

Raises:
HTTPBadRequest: The param was not found in the request, even
though it was required to be there, or it was found but
could not be converted to an ``int``. Also raised if the
param's value falls outside the given interval, i.e., the
value must be in the interval: min_value <= value <=
max_value to avoid triggering an error.

"""

params = self._params

# PERF: Use if..in since it is a good all-around performer; we don't
#       know how likely params are to be specified by clients.
if name in params:
val_str = params[name]
if isinstance(val_str, list):
val_str = val_str[-1]

try:
val = int(val_str)
except ValueError:
msg = 'The value must be an integer.'
raise errors.HTTPInvalidParam(msg, name)

if min_value is not None and val < min_value:
msg = 'The value must be at least ' + str(min_value)
raise errors.HTTPInvalidParam(msg, name)

if max_value is not None and max_value < val:
msg = 'The value may not exceed ' + str(max_value)
raise errors.HTTPInvalidParam(msg, name)

if store is not None:
store[name] = val

return val

if not required:
return default

raise errors.HTTPMissingParam(name)

@overload
def get_param_as_float(
self,
name: str,
required: Literal[True],
min_value: float | None = ...,
max_value: float | None = ...,
store: StoreArg = ...,
default: float | None = ...,
) -> float: ...

@overload
def get_param_as_float(
self,
name: str,
required: bool = ...,
min_value: float | None = ...,
max_value: float | None = ...,
store: StoreArg = ...,
*,
default: float,
) -> float: ...

@overload
def get_param_as_float(
self,
name: str,
required: bool = ...,
min_value: float | None = ...,
max_value: float | None = ...,
store: StoreArg = ...,
default: float | None = ...,
) -> float | None: ...

def get_param_as_float(
self,
name: str,
required: bool = False,
min_value: float | None = None,
max_value: float | None = None,
store: StoreArg = None,
default: float | None = None,
) -> float | None:
"""Return the value of a query string parameter as an float.

Args:
name (str): Parameter name, case-sensitive (e.g., 'limit').

Keyword Args:
required (bool): Set to ``True`` to raise
``HTTPBadRequest`` instead of returning ``None`` when the
parameter is not found or is not a float (default ``False``).
min_value (float): Set to the minimum value allowed for this
param. If the param is found and it is less than min_value, an
``HTTPError`` is raised.
max_value (float): Set to the maximum value allowed for this
param. If the param is found and its value is greater than
max_value, an ``HTTPError`` is raised.
store (dict): A ``dict``-like object in which to place
the value of the param, but only if the param is found
(default ``None``).
default (any): If the param is not found returns the
given value instead of ``None``

Returns:
float: The value of the param if it is found and can be converted to
an ``float``. If the param is not found, returns ``None``, unless
`required` is ``True``.

Raises:
HTTPBadRequest: The param was not found in the request, even
though it was required to be there, or it was found but
could not be converted to an ``float``. Also raised if the
param's value falls outside the given interval, i.e., the
value must be in the interval: min_value <= value <=
max_value to avoid triggering an error.

"""

params = self._params

# PERF: Use if..in since it is a good all-around performer; we don't
#       know how likely params are to be specified by clients.
if name in params:
val_str = params[name]
if isinstance(val_str, list):
val_str = val_str[-1]

try:
val = float(val_str)
except ValueError:
msg = 'The value must be a float.'
raise errors.HTTPInvalidParam(msg, name)

if min_value is not None and val < min_value:
msg = 'The value must be at least ' + str(min_value)
raise errors.HTTPInvalidParam(msg, name)

if max_value is not None and max_value < val:
msg = 'The value may not exceed ' + str(max_value)
raise errors.HTTPInvalidParam(msg, name)

if store is not None:
store[name] = val

return val

if not required:
return default

raise errors.HTTPMissingParam(name)

@overload
def get_param_as_uuid(
self,
name: str,
required: Literal[True],
store: StoreArg = ...,
default: UUID | None = ...,
) -> UUID: ...

@overload
def get_param_as_uuid(
self,
name: str,
required: bool = ...,
store: StoreArg = ...,
*,
default: UUID,
) -> UUID: ...

@overload
def get_param_as_uuid(
self,
name: str,
required: bool = ...,
store: StoreArg = ...,
default: UUID | None = ...,
) -> UUID | None: ...

def get_param_as_uuid(
self,
name: str,
required: bool = False,
store: StoreArg = None,
default: UUID | None = None,
) -> UUID | None:
"""Return the value of a query string parameter as an UUID.

The value to convert must conform to the standard UUID string
representation per RFC 4122. For example, the following
strings are all valid::

# Lowercase
'64be949b-3433-4d36-a4a8-9f19d352fee8'

# Uppercase
'BE71ECAA-F719-4D42-87FD-32613C2EEB60'

# Mixed
'81c8155C-D6de-443B-9495-39Fa8FB239b5'

Args:
name (str): Parameter name, case-sensitive (e.g., 'id').

Keyword Args:
required (bool): Set to ``True`` to raise
``HTTPBadRequest`` instead of returning ``None`` when the
parameter is not found or is not a UUID (default
``False``).
store (dict): A ``dict``-like object in which to place
the value of the param, but only if the param is found
(default ``None``).
default (any): If the param is not found returns the
given value instead of ``None``

Returns:
UUID: The value of the param if it is found and can be converted to
a ``UUID``. If the param is not found, returns
``default`` (default ``None``), unless `required` is ``True``.

Raises:
HTTPBadRequest: The param was not found in the request, even
though it was required to be there, or it was found but
could not be converted to a ``UUID``.
"""

params = self._params

# PERF: Use if..in since it is a good all-around performer; we don't
#       know how likely params are to be specified by clients.
if name in params:
val_str = params[name]
if isinstance(val_str, list):
val_str = val_str[-1]

try:
val = UUID(val_str)
except ValueError:
msg = 'The value must be a UUID string.'
raise errors.HTTPInvalidParam(msg, name)

if store is not None:
store[name] = val

return val

if not required:
return default

raise errors.HTTPMissingParam(name)

@overload
def get_param_as_bool(
self,
name: str,
required: Literal[True],
store: StoreArg = ...,
blank_as_true: bool = ...,
default: bool | None = ...,
) -> bool: ...

@overload
def get_param_as_bool(
self,
name: str,
required: bool = ...,
store: StoreArg = ...,
blank_as_true: bool = ...,
*,
default: bool,
) -> bool: ...

@overload
def get_param_as_bool(
self,
name: str,
required: bool = ...,
store: StoreArg = ...,
blank_as_true: bool = ...,
default: bool | None = ...,
) -> bool | None: ...

def get_param_as_bool(
self,
name: str,
required: bool = False,
store: StoreArg = None,
blank_as_true: bool = True,
default: bool | None = None,
) -> bool | None:
"""Return the value of a query string parameter as a boolean.

This method treats valueless parameters as flags. By default, if no
value is provided for the parameter in the query string, ``True`` is
assumed and returned. If the parameter is missing altogether, ``None``
is returned as with other ``get_param_*()`` methods, which can be
easily treated as falsy by the caller as needed.

The following boolean strings are supported::

TRUE_STRINGS = ('true', 'True', 't', 'yes', 'y', '1', 'on')
FALSE_STRINGS = ('false', 'False', 'f', 'no', 'n', '0', 'off')

Args:
name (str): Parameter name, case-sensitive (e.g., 'detailed').

Keyword Args:
required (bool): Set to ``True`` to raise
``HTTPBadRequest`` instead of returning ``None`` when the
parameter is not found or is not a recognized boolean
string (default ``False``).
store (dict): A ``dict``-like object in which to place
the value of the param, but only if the param is found (default
``None``).
blank_as_true (bool): Valueless query string parameters
are treated as flags, resulting in ``True`` being
returned when such a parameter is present, and ``False``
otherwise. To require the client to explicitly opt-in to a
truthy value, pass ``blank_as_true=False`` to return ``False``
when a value is not specified in the query string.
default (any): If the param is not found, return this
value instead of ``None``.

Returns:
bool: The value of the param if it is found and can be converted
to a ``bool``. If the param is not found, returns ``None``
unless `required` is ``True``.

Raises:
HTTPBadRequest: A required param is missing from the request, or
can not be converted to a ``bool``.

"""

params = self._params

# PERF: Use if..in since it is a good all-around performer; we don't
#       know how likely params are to be specified by clients.
if name in params:
val_str = params[name]
if isinstance(val_str, list):
val_str = val_str[-1]

if val_str in TRUE_STRINGS:
val = True
elif val_str in FALSE_STRINGS:
val = False
elif not val_str:
val = blank_as_true
else:
msg = 'The value of the parameter must be "true" or "false".'
raise errors.HTTPInvalidParam(msg, name)

if store is not None:
store[name] = val

return val

if not required:
return default

raise errors.HTTPMissingParam(name)

@overload
def get_param_as_list(
self,
name: str,
transform: None = ...,
*,
required: Literal[True],
store: StoreArg = ...,
default: list[str] | None = ...,
delimiter: str | None = None,
) -> list[str]: ...

@overload
def get_param_as_list(
self,
name: str,
transform: Callable[[str], _T],
required: Literal[True],
store: StoreArg = ...,
default: list[_T] | None = ...,
delimiter: str | None = None,
) -> list[_T]: ...

@overload
def get_param_as_list(
self,
name: str,
transform: None = ...,
required: bool = ...,
store: StoreArg = ...,
*,
default: list[str],
delimiter: str | None = None,
) -> list[str]: ...

@overload
def get_param_as_list(
self,
name: str,
transform: Callable[[str], _T],
required: bool = ...,
store: StoreArg = ...,
*,
default: list[_T],
delimiter: str | None = None,
) -> list[_T]: ...

@overload
def get_param_as_list(
self,
name: str,
transform: None = ...,
required: bool = ...,
store: StoreArg = ...,
default: list[str] | None = ...,
delimiter: str | None = None,
) -> list[str] | None: ...

@overload
def get_param_as_list(
self,
name: str,
transform: Callable[[str], _T],
required: bool = ...,
store: StoreArg = ...,
default: list[_T] | None = ...,
delimiter: str | None = None,
) -> list[_T] | None: ...

def get_param_as_list(
self,
name: str,
transform: Callable[[str], _T] | None = None,
required: bool = False,
store: StoreArg = None,
default: list[_T] | None = None,
delimiter: str | None = None,
) -> list[_T] | list[str] | None:
"""Return the value of a query string parameter as a list.

List items must be comma-separated or must be provided
as multiple instances of the same param in the query string
ala *application/x-www-form-urlencoded*.

Note:
To enable the interpretation of comma-separated parameter values,
the :attr:`~falcon.RequestOptions.auto_parse_qs_csv` option must
be set to ``True`` (default ``False``).

Args:
name (str): Parameter name, case-sensitive (e.g., 'ids').

Keyword Args:
transform (callable): An optional transform function
that takes as input each element in the list as a ``str`` and
outputs a transformed element for inclusion in the list that
will be returned. For example, passing ``int`` will
transform list items into numbers.
required (bool): Set to ``True`` to raise ``HTTPBadRequest``
instead of returning ``None`` when the parameter is not
found (default ``False``).
store (dict): A ``dict``-like object in which to place
the value of the param, but only if the param is found (default
``None``).
default (any): If the param is not found returns the
given value instead of ``None``.
delimiter(str): An optional character for splitting a parameter
value into a list. In addition to the ``','``, ``' '``, and
``'|'`` characters, the ``'spaceDelimited'`` and
``'pipeDelimited'`` symbolic constants from the
`OpenAPI v3 parameter specification
<https://spec.openapis.org/oas/v3.2.0.html#style-values>`__
are also supported.

Note:
If the parameter was already passed as an array, e.g., as
multiple instances (the OAS ``'explode'`` style), the
`delimiter` argument has no effect.

Note:
In contrast to the automatic splitting of comma-separated
values via the
:attr:`~falcon.RequestOptions.auto_parse_qs_csv` option,
values are split by `delimiter` **after** percent-decoding
the query string.

The :attr:`~falcon.RequestOptions.keep_blank_qs_values`
option has no effect on the secondary splitting by
`delimiter` either.

.. versionadded:: 4.3
The `delimiter` keyword argument.

Returns:
list: The value of the param if it is found. Otherwise, returns
``None`` unless *required* is ``True``.

Empty list elements will be included by default, but this behavior
can be configured by setting the
:attr:`~falcon.RequestOptions.keep_blank_qs_values` option. For
example, by default the following query strings would both result in
``['1', '', '3']``::

things=1&things=&things=3
things=1,,3

Note, however, that for the second example string above to be
interpreted as a list, the
:attr:`~falcon.RequestOptions.auto_parse_qs_csv` option must be
set to ``True``.

Even if the :attr:`~falcon.RequestOptions.auto_parse_qs_csv` option
is set (by default) to ``False``, a value can also be split into
list elements by using an OpenAPI spec-compatible delimiter, e.g.:

>>> req
<Request: GET 'http://falconframework.org/?colors=blue%7Cblack%7Cbrown'>
>>> req.get_param_as_list('colors', delimiter='pipeDelimited')
['blue', 'black', 'brown']

Raises:
HTTPBadRequest: A required param is missing from the request, or
a transform function raised an instance of ``ValueError``.

"""

params = self._params

# PERF: Use if..in since it is a good all-around performer; we don't
#       know how likely params are to be specified by clients.
if name in params:
items = params[name]

# NOTE(bricklayer25): If a delimiter is specified AND the param is
#   a single string, split it.
if delimiter is not None and isinstance(items, str):
if delimiter not in _PARAM_VALUE_DELIMITERS:
raise ValueError(
f'Unsupported delimiter value: {delimiter!r};'
f' supported: {tuple(_PARAM_VALUE_DELIMITERS)}'
)
items = items.split(_PARAM_VALUE_DELIMITERS[delimiter])

# NOTE(warsaw): When a key appears multiple times in the request
# query, it will already be represented internally as a list.
# NOTE(kgriffs): Likewise for comma-delimited values.
if not isinstance(items, list):
items = [items]

items_ret: list[str] | list[_T]
# PERF(kgriffs): Use if-else rather than a DRY approach
# that sets transform to a passthrough function; avoids
# function calling overhead.
if transform is not None:
try:
items_ret = [transform(i) for i in items]

except ValueError:
msg = 'The value is not formatted correctly.'
raise errors.HTTPInvalidParam(msg, name)
else:
items_ret = items

if store is not None:
store[name] = items_ret

return items_ret

if not required:
return default

raise errors.HTTPMissingParam(name)

@overload
def get_param_as_datetime(
self,
name: str,
format_string: str = ...,
*,
required: Literal[True],
store: StoreArg = ...,
default: datetime | None = ...,
) -> datetime: ...

@overload
def get_param_as_datetime(
self,
name: str,
format_string: str = ...,
required: bool = ...,
store: StoreArg = ...,
*,
default: datetime,
) -> datetime: ...

@overload
def get_param_as_datetime(
self,
name: str,
format_string: str = ...,
required: bool = ...,
store: StoreArg = ...,
default: datetime | None = ...,
) -> datetime | None: ...

def get_param_as_datetime(
self,
name: str,
format_string: str = '%Y-%m-%dT%H:%M:%S%z',
required: bool = False,
store: StoreArg = None,
default: datetime | None = None,
) -> datetime | None:
"""Return the value of a query string parameter as a datetime.

Args:
name (str): Parameter name, case-sensitive (e.g., 'ids').

Keyword Args:
format_string (str): String used to parse the param value
into a ``datetime``. Any format recognized by strptime() is
supported (default ``'%Y-%m-%dT%H:%M:%S%z'``).
required (bool): Set to ``True`` to raise
``HTTPBadRequest`` instead of returning ``None`` when the
parameter is not found (default ``False``).
store (dict): A ``dict``-like object in which to place
the value of the param, but only if the param is found (default
``None``).
default (any): If the param is not found returns the
given value instead of ``None``
Returns:
datetime.datetime: The value of the param if it is found and can be
converted to a ``datetime`` according to the supplied format
string. If the param is not found, returns ``None`` unless
required is ``True``.

Raises:
HTTPBadRequest: A required param is missing from the request, or
the value could not be converted to a ``datetime``.

.. versionchanged:: 4.0
The default value of `format_string` was changed from
``'%Y-%m-%dT%H:%M:%SZ'`` to ``'%Y-%m-%dT%H:%M:%S%z'``.

The new format is a superset of the old one parsing-wise, however,
the converted :class:`~datetime.datetime` object is now
timezone-aware.
"""

param_value = self.get_param(name, required=required)

if param_value is None:
return default

try:
date_time = strptime(param_value, format_string)
except ValueError:
msg = 'The date value does not match the required format.'
raise errors.HTTPInvalidParam(msg, name)

if store is not None:
store[name] = date_time

return date_time

@overload
def get_param_as_date(
self,
name: str,
format_string: str = ...,
*,
required: Literal[True],
store: StoreArg = ...,
default: py_date | None = ...,
) -> py_date: ...

@overload
def get_param_as_date(
self,
name: str,
format_string: str = ...,
required: bool = ...,
store: StoreArg = ...,
*,
default: py_date,
) -> py_date: ...

@overload
def get_param_as_date(
self,
name: str,
format_string: str = ...,
required: bool = ...,
store: StoreArg = ...,
default: py_date | None = ...,
) -> py_date | None: ...

def get_param_as_date(
self,
name: str,
format_string: str = '%Y-%m-%d',
required: bool = False,
store: StoreArg = None,
default: py_date | None = None,
) -> py_date | None:
"""Return the value of a query string parameter as a date.

Args:
name (str): Parameter name, case-sensitive (e.g., 'ids').

Keyword Args:
format_string (str): String used to parse the param value
into a date. Any format recognized by strptime() is
supported (default ``"%Y-%m-%d"``).
required (bool): Set to ``True`` to raise
``HTTPBadRequest`` instead of returning ``None`` when the
parameter is not found (default ``False``).
store (dict): A ``dict``-like object in which to place
the value of the param, but only if the param is found (default
``None``).
default (any): If the param is not found returns the
given value instead of ``None``
Returns:
datetime.date: The value of the param if it is found and can be
converted to a ``date`` according to the supplied format
string. If the param is not found, returns ``None`` unless
required is ``True``.

Raises:
HTTPBadRequest: A required param is missing from the request, or
the value could not be converted to a ``date``.
"""

date_time = self.get_param_as_datetime(name, format_string, required)
if date_time:
date = date_time.date()
else:
return default

if store is not None:
store[name] = date

return date

def get_param_as_json(
self,
name: str,
required: bool = False,
store: StoreArg = None,
default: Any | None = None,
) -> Any:
"""Return the decoded JSON value of a query string parameter.

Given a JSON value, decode it to an appropriate Python type,
(e.g., ``dict``, ``list``, ``str``, ``int``, ``bool``, etc.)

Warning:
If the :attr:`~falcon.RequestOptions.auto_parse_qs_csv` option is
set to ``True`` (default ``False``), the framework will
misinterpret any JSON values that include literal
(non-percent-encoded) commas. If the query string may include
JSON, you can use JSON array syntax in lieu of CSV as a workaround.

Args:
name (str): Parameter name, case-sensitive (e.g., 'payload').

Keyword Args:
required (bool): Set to ``True`` to raise ``HTTPBadRequest``
instead of returning ``None`` when the parameter is not
found (default ``False``).
store (dict): A ``dict``-like object in which to place the
value of the param, but only if the param is found
(default ``None``).
default (any): If the param is not found returns the
given value instead of ``None``

Returns:
dict: The value of the param if it is found. Otherwise, returns
``None`` unless required is ``True``.

Raises:
HTTPBadRequest: A required param is missing from the request, or
the value could not be parsed as JSON.
"""

param_value = self.get_param(name, required=required)

if param_value is None:
return default

handler, _, _ = self.options.media_handlers._resolve(
MEDIA_JSON, MEDIA_JSON, raise_not_found=False
)
if handler is None:
handler = _DEFAULT_JSON_HANDLER

try:
# TODO(CaselIT): find a way to avoid encode + BytesIO if handlers
# interface is refactored. Possibly using the WS interface?
val = handler.deserialize(
BytesIO(param_value.encode()), MEDIA_JSON, len(param_value)
)
except errors.HTTPBadRequest:
msg = 'It could not be parsed as JSON.'
raise errors.HTTPInvalidParam(msg, name)

if store is not None:
store[name] = val

return val

def has_param(self, name: str) -> bool:
"""Determine whether or not the query string parameter already exists.

Args:
name (str): Parameter name, case-sensitive (e.g., 'sort').

Returns:
bool: ``True`` if param is found, or ``False`` if param is
not found.

"""

return name in self._params

def log_error(self, message: str) -> None:
"""Write an error message to the server's log.

Prepends timestamp and request info to message, and writes the
result out to the WSGI server's error stream (`wsgi.error`).

Args:
message (str): Description of the problem.

"""

if self.query_string:
query_string_formatted = '?' + self.query_string
else:
query_string_formatted = ''

log_line = DEFAULT_ERROR_LOG_FORMAT.format(
now(), self.method, self.path, query_string_formatted
)

self._wsgierrors.write(log_line + message + '\n')

# ------------------------------------------------------------------------
# Helpers
# ------------------------------------------------------------------------

def _get_wrapped_wsgi_input(self) -> BoundedStream:
try:
content_length = self.content_length or 0

# NOTE(kgriffs): This branch is indeed covered in test_wsgi.py
# even though coverage isn't able to detect it.
except errors.HTTPInvalidHeader:  # pragma: no cover
# NOTE(kgriffs): The content-length header was specified,
# but it had an invalid value. Assume no content.
content_length = 0

return BoundedStream(self.env['wsgi.input'], content_length)

def _parse_form_urlencoded(self) -> None:
content_length = self.content_length
if not content_length:
return

body_bytes = self.stream.read(content_length)

# NOTE(kgriffs): According to
# https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#application%2Fx-www-form-urlencoded-encoding-algorithm
# the
# body should be US-ASCII. Enforcing this also helps
# catch malicious input.
try:
body = body_bytes.decode('ascii')
except UnicodeDecodeError:
body = None
self.log_error(
'Non-ASCII characters found in form body '
'with Content-Type of '
'application/x-www-form-urlencoded. Body '
'will be ignored.'
)

if body:
extra_params = parse_query_string(
body,
keep_blank=self.options.keep_blank_qs_values,
csv=self.options.auto_parse_qs_csv,
)

self._params.update(extra_params)


# PERF: To avoid typos and improve storage space and speed over a dict.
class RequestOptions:
"""Defines a set of configurable request options.

An instance of this class is exposed via :attr:`falcon.App.req_options` and
:attr:`falcon.asgi.App.req_options` for configuring certain
:class:`~.Request` and :class:`falcon.asgi.Request` behaviors,
respectively.
"""

keep_blank_qs_values: bool
"""Set to ``False`` to ignore query string params that have missing or blank
values (default ``True``).

For comma-separated values, this option also determines whether or not
empty elements in the parsed list are retained.
"""

@property
def auto_parse_form_urlencoded(self) -> bool:
"""Set to ``True`` in order to automatically consume the request stream
and merge the results into the request's query string params when the
request's content type is ``application/x-www-form-urlencoded```
(default ``False``).

Enabling this option for WSGI apps makes the form parameters accessible
via :attr:`~falcon.Request.params`, :meth:`~falcon.Request.get_param`,
etc.

.. deprecated:: 3.0
The `auto_parse_form_urlencoded` option is not supported for
ASGI apps, and is considered deprecated for WSGI apps as of
Falcon 3.0, in favor of accessing URL-encoded forms
through :meth:`~falcon.Request.get_media`.

The attribute and the auto-parsing functionality will be removed
entirely in Falcon 5.0.

See also: :ref:`access_urlencoded_form`.

Warning:
When this option is enabled, the request's body
stream will be left at EOF. The original data is
not retained by the framework.

Note:
The character encoding for fields, before
percent-encoding non-ASCII bytes, is assumed to be
UTF-8. The special `_charset_` field is ignored if
present.

Falcon expects form-encoded request bodies to be
encoded according to the standard W3C algorithm (see
also https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#application%2Fx-www-form-urlencoded-encoding-algorithm).
"""  # noqa: D205
return self._auto_parse_form_urlencoded

@auto_parse_form_urlencoded.setter
def auto_parse_form_urlencoded(self, value: bool) -> None:
if value:
warnings.warn(
'The RequestOptions.auto_parse_form_urlencoded option is '
'deprecated. Please use Request.get_media() to consume '
'the submitted URL-encoded form instead.',
category=deprecation.DeprecatedWarning,
)

self._auto_parse_form_urlencoded = value

auto_parse_qs_csv: bool
"""Set to ``True`` to split query string values on any non-percent-encoded
commas (default ``False``).

When ``False``, values containing commas are left as-is. In this mode, list items
are taken only from multiples of the same parameter name within the
query string (i.e. ``t=1,2,3&t=4`` becomes ``['1,2,3', '4']``).

When `auto_parse_qs_csv` is set to ``True``, the query string value is also
split on non-percent-encoded commas and these items are added to the final
list (i.e. ``t=1,2,3&t=4,5`` becomes ``['1', '2', '3', '4', '5']``).

Warning:
Enabling this option will cause the framework to misinterpret
any JSON values that include literal (non-percent-encoded)
commas. If the query string may include JSON, you can
use JSON array syntax in lieu of CSV as a workaround.
"""
strip_url_path_trailing_slash: bool
"""Set to ``True`` in order to strip the trailing slash, if present, at the
end of the URL path (default ``False``).

When this option is enabled, the URL path is normalized by stripping the
trailing slash character. This lets the application define a single route
to a resource for a path that may or may not end in a forward slash.
However, this behavior can be problematic in certain cases, such as when
working with authentication schemes that employ URL-based signatures.
"""
default_media_type: str
"""The default media-type used to deserialize a request body, when the
Content-Type header is missing or ambiguous.

This value is normally set to the media type provided to the :class:`falcon.App`
or :class:`falcon.asgi.App` initializer; however, if created independently,
this will default to :attr:`falcon.DEFAULT_MEDIA_TYPE`.
"""
media_handlers: Handlers
"""A dict-like object for configuring the media-types to handle.

By default, handlers are provided for the ``application/json``,
``application/x-www-form-urlencoded`` and ``multipart/form-data`` media types.
"""

__slots__ = (
'keep_blank_qs_values',
'_auto_parse_form_urlencoded',
'auto_parse_qs_csv',
'strip_url_path_trailing_slash',
'default_media_type',
'media_handlers',
)

def __init__(self) -> None:
self.keep_blank_qs_values = True
self._auto_parse_form_urlencoded = False
self.auto_parse_qs_csv = False
self.strip_url_path_trailing_slash = False
self.default_media_type = DEFAULT_MEDIA_TYPE
self.media_handlers = Handlers()

bash
command
cat /tmp/inputs/falcon/response.py | head -200

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

"""Response class."""

from __future__ import annotations

from collections.abc import Iterable
from collections.abc import Mapping
from datetime import datetime
from datetime import timezone
import functools
import mimetypes
from typing import (
Any,
ClassVar,
NoReturn,
overload,
TYPE_CHECKING,
)
import warnings

from falcon._typing import _UNSET
from falcon._typing import RangeSetHeader
from falcon._typing import UnsetOr
from falcon.constants import _DEFAULT_STATIC_MEDIA_TYPES
from falcon.constants import DEFAULT_MEDIA_TYPE
from falcon.errors import HeaderNotSupported
from falcon.media import Handlers
from falcon.response_helpers import _format_content_disposition
from falcon.response_helpers import _format_etag_header
from falcon.response_helpers import _format_header_value_list
from falcon.response_helpers import _format_range
from falcon.response_helpers import _header_property
from falcon.response_helpers import _is_ascii_encodable
from falcon.typing import Headers
from falcon.typing import ReadableIO
from falcon.util import dt_to_http
from falcon.util import http_cookies
from falcon.util import http_status_to_code
from falcon.util import structures
from falcon.util.deprecation import AttributeRemovedError
from falcon.util.deprecation import DeprecatedWarning
from falcon.util.uri import encode_check_escaped as uri_encode
from falcon.util.uri import encode_value_check_escaped as uri_encode_value

if TYPE_CHECKING:
import http


_RESERVED_CROSSORIGIN_VALUES = frozenset({'anonymous', 'use-credentials'})
_RESERVED_SAMESITE_VALUES = frozenset({'lax', 'strict', 'none'})


class Response:
"""Represents an HTTP response to a client request.

Note:
``Response`` is not meant to be instantiated directly by responders.

Keyword Arguments:
options (ResponseOptions): Set of global options passed from the App handler.
"""

__slots__ = (
'text',
'context',
'options',
'status',
'stream',
'_cookies',
'_data',
'_extra_headers',
'_headers',
'_media',
'_media_rendered',
'__dict__',
)

_cookies: http_cookies.SimpleCookie | None
_data: bytes | None
_extra_headers: list[tuple[str, str]] | None
_headers: Headers
_media: Any | None
_media_rendered: UnsetOr[bytes]

# Child classes may override this
context_type: ClassVar[type] = structures.Context
"""Class variable that determines the factory or
type to use for initializing the `context` attribute. By default,
the framework will instantiate bare objects (instances of the bare
:class:`falcon.Context` class). However, you may override this
behavior by creating a custom child class of
:class:`falcon.Response`, and then passing that new class to
``falcon.App()`` by way of the latter's `response_type` parameter.

Note:
When overriding `context_type` with a factory function (as
opposed to a class), the function is called like a method of
the current Response instance. Therefore the first argument is
the Response instance itself (self).
"""

# Attribute declaration
complete: bool = False
"""Set to ``True`` from within a middleware method to signal to the framework that
request processing should be short-circuited (see also
:ref:`Middleware <middleware>`).
"""
status: str | int | http.HTTPStatus
"""HTTP status code or line (e.g., ``'200 OK'``).

This may be set to a member of :class:`http.HTTPStatus`, an HTTP status line
string (e.g., ``'200 OK'``), or an ``int``.

Note:
The Falcon framework itself provides a number of constants for
common status codes. They all start with the ``HTTP_`` prefix,
as in: ``falcon.HTTP_204``. (See also: :ref:`status`.)
"""
text: str | None
"""String representing response content.

Note:
Falcon will encode the given text as UTF-8 in the response. If the content
is already a byte string, use the :attr:`data` attribute instead (it's faster).
"""
stream: ReadableIO | Iterable[bytes] | None
"""Either a file-like object with a `read()` method that takes an optional size
argument and returns a block of bytes, or an iterable object, representing response
content, and yielding blocks as byte strings. Falcon will use *wsgi.file_wrapper*,
if provided by the WSGI server, in order to efficiently serve file-like objects.

Note:
If the stream is set to an iterable object that requires
resource cleanup, it can implement a close() method to do so.
The close() method will be called upon completion of the request.
"""
context: structures.Context
"""Empty object to hold any data (in its attributes) about the response which is
specific to your app (e.g. session object).
Falcon itself will not interact with this attribute after it has been initialized.

Note:
The preferred way to pass response-specific data, when using the
default context type, is to set attributes directly on the
`context` object. For example::

resp.context.cache_strategy = 'lru'
"""
options: ResponseOptions
"""Set of global options passed in from the App handler."""

def __init__(self, options: ResponseOptions | None = None) -> None:
self.status = '200 OK'
self._headers = {}

# NOTE(kgriffs): Collection of additional headers as a list of raw
#   tuples, to use in cases where we need more control over setting
#   headers and duplicates are allowable or even necessary.
#
# PERF(kgriffs): Save some CPU cycles and a few bytes of RAM by
#   only instantiating the list object later on IFF it is needed.
self._extra_headers = None

self.options = options if options is not None else ResponseOptions()

# NOTE(tbug): will be set to a SimpleCookie object
# when cookie is set via set_cookie
self._cookies = None

self.text = None
self.stream = None
self._data = None
self._media = None
self._media_rendered = _UNSET

self.context = self.context_type()

@property
def status_code(self) -> int:
"""HTTP status code normalized from :attr:`status`.

When a code is assigned to this property, :attr:`status` is updated,
and vice-versa. The status code can be useful when needing to check
in middleware for codes that fall into a certain class, e.g.::

if resp.status_code >= 400:
log.warning(f'returning error response: {resp.status_code}')

bash
command
cat /tmp/inputs/falcon/asgi/request.py | head -100

output
# Copyright 2019-2020 by Kurt Griffiths
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

"""ASGI Request class."""

from __future__ import annotations

from collections.abc import Awaitable
from collections.abc import Mapping
from typing import (
Any,
cast,
Literal,
NoReturn,
overload,
)

from falcon import errors
from falcon import request
from falcon import request_helpers as helpers
from falcon._typing import _UNSET
from falcon._typing import AsgiReceive
from falcon._typing import StoreArg
from falcon._typing import UnsetOr
from falcon.asgi_spec import AsgiEvent
from falcon.constants import SINGLETON_HEADERS
from falcon.forwarded import Forwarded
from falcon.util import deprecation
from falcon.util import ETag
from falcon.util.uri import parse_host
from falcon.util.uri import parse_query_string

from . import _request_helpers as asgi_helpers
from .stream import BoundedStream

__all__ = ('Request',)

_SINGLETON_HEADERS_BYTESTR = frozenset([h.encode() for h in SINGLETON_HEADERS])


class Request(request.Request):
"""Represents a client's HTTP request.

Note:
`Request` is not meant to be instantiated directly by responders.

Args:
scope (dict): ASGI HTTP connection scope passed in from the server (see
also: `Connection Scope`_).
receive (awaitable): ASGI awaitable callable that will yield a new
event dictionary when one is available.

Keyword Args:
first_event (dict): First ASGI event received from the client,
if one was preloaded (default ``None``).
options (falcon.request.RequestOptions): Set of global request options
passed from the App handler.

.. _Connection Scope:
https://asgi.readthedocs.io/en/latest/specs/www.html#connection-scope

"""

__slots__ = [
'_asgi_headers',
# '_asgi_server_cached',
# '_cached_headers',
'_first_event',
'_receive',
# '_stream',
'scope',
]

# PERF(vytas): These boilerplates values will be shadowed when set on an
#   instance. Avoiding a statement per each of those values allows to speed
#   up __init__ substantially.
_asgi_server_cached: tuple[str, int] | None = None
_cached_access_route: list[str] | None = None
_cached_forwarded: list[Forwarded] | None = None
_cached_forwarded_prefix: str | None = None
_cached_forwarded_uri: str | None = None
_cached_headers: dict[str, str] | None = None
# NOTE: _cached_headers_lower is not used
_cached_prefix: str | None = None
_cached_relative_uri: str | None = None
_cached_uri: str | None = None
_media: UnsetOr[Any] = _UNSET
_media_error: Exception | None = None
_stream: BoundedStream | None = None

bash
command
cat /tmp/inputs/falcon/testing/client.py | head -200

output
# Copyright 2016 by Rackspace Hosting, Inc.
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

"""WSGI test client utilities.

This package includes utilities for simulating HTTP requests against a
WSGI callable, without having to stand up a WSGI server.
"""

from __future__ import annotations

import asyncio
from collections.abc import Awaitable
from collections.abc import Coroutine
from collections.abc import Iterable
from collections.abc import Mapping
from collections.abc import Sequence
import datetime as dt
from http.cookies import Morsel
import inspect
import json as json_module
import time
from typing import (
Any,
Callable,
cast,
Literal,
overload,
TextIO,
TYPE_CHECKING,
TypeVar,
)
import warnings
import wsgiref.validate

from falcon._typing import CookieArg
from falcon._typing import HeaderArg
from falcon._typing import HeaderIter
from falcon._typing import HeaderMapping
from falcon.asgi_spec import AsgiEvent
from falcon.asgi_spec import ScopeType
from falcon.constants import COMBINED_METHODS
from falcon.constants import MEDIA_JSON
from falcon.errors import CompatibilityError
from falcon.testing import helpers
from falcon.testing.srmock import StartResponseMock
from falcon.typing import Headers
from falcon.util import async_to_sync
from falcon.util import CaseInsensitiveDict
from falcon.util import code_to_http_status
from falcon.util import http_cookies
from falcon.util import http_date_to_dt
from falcon.util import to_query_str

if TYPE_CHECKING:
import falcon
from falcon import asgi

warnings.filterwarnings(
'error',
('Unknown REQUEST_METHOD: ' + "'({})'".format('|'.join(COMBINED_METHODS))),
wsgiref.validate.WSGIWarning,
'',
0,
)

_T = TypeVar('_T', bound=Callable[..., Any])


def _simulate_method_alias(
method: _T, version_added: str = '3.1', replace_name: str | None = None
) -> _T:
def alias(client: Any, *args: Any, **kwargs: Any) -> Any:
return method(client, *args, **kwargs)

async def async_alias(client: Any, *args: Any, **kwargs: Any) -> Any:
return await method(client, *args, **kwargs)

alias = async_alias if inspect.iscoroutinefunction(method) else alias

assert method.__doc__
alias.__doc__ = method.__doc__ + '\n        .. versionadded:: {}\n'.format(
version_added
)
if replace_name:
alias.__doc__ = alias.__doc__.replace(method.__name__, replace_name)
alias.__name__ = replace_name
else:
alias.__name__ = method.__name__.partition('simulate_')[-1]

return cast(_T, alias)


class Cookie:
"""Represents a cookie returned by a simulated request.

Args:
morsel: A ``Morsel`` object from which to derive the cookie data.
"""

_expires: str | None
_path: str
_domain: str
_max_age: str | None
_secure: str | None
_httponly: str | None
_samesite: str | None
_partitioned: str | None

def __init__(self, morsel: Morsel) -> None:
self._name = morsel.key
self._value = morsel.value

for name in (
'expires',
'path',
'domain',
'max_age',
'secure',
'httponly',
'samesite',
'partitioned',
):
value = morsel[name.replace('_', '-')] or None
setattr(self, '_' + name, value)

@property
def name(self) -> str:
"""The cookie's name."""
return self._name

@property
def value(self) -> str:
"""The value of the cookie."""
return self._value

@property
def expires(self) -> dt.datetime | None:
"""Expiration timestamp for the cookie, or ``None`` if not specified.

.. versionchanged:: 4.0
This property now returns timezone-aware
:class:`~datetime.datetime` objects (or ``None``).
"""
if self._expires:
return http_date_to_dt(self._expires, obs_date=True)

return None

@property
def path(self) -> str:
"""The path prefix to which this cookie is restricted.

An empty string if not specified.
"""
return self._path

@property
def domain(self) -> str:
"""The domain to which this cookie is restricted.

An empty string if not specified.
"""
return self._domain

@property
def max_age(self) -> int | None:
"""The lifetime of the cookie in seconds, or ``None`` if not specified."""
return int(self._max_age) if self._max_age else None

@property
def secure(self) -> bool:
"""Whether or not the cookie may only only be transmitted
from the client via HTTPS.
"""  # noqa: D205
return bool(self._secure)

@property
def http_only(self) -> bool:
"""Whether or not the cookie will be visible from JavaScript in the client."""
return bool(self._httponly)

@property
def same_site(self) -> str | None:
"""Specifies whether cookies are send in cross-site requests.

Possible values are 'Lax', 'Strict' and 'None'. ``None`` if not specified.
"""
return self._samesite if self._samesite else None

bash
command
cat /tmp/inputs/falcon/testing/test_case.py | head -100

output
# Copyright 2016 by Rackspace Hosting, Inc.
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

"""unittest-style base class and utilities for test cases.

This package includes a unittest-style base class and requests-like
utilities for simulating and validating HTTP requests.
"""

try:
import testtools as unittest
except ImportError:  # pragma: nocover
import unittest

import falcon
import falcon.request

# TODO: Hoist for backwards compat. Remove in Falcon 5.0.
from falcon.testing.client import Result  # NOQA
from falcon.testing.client import TestClient


class TestCase(unittest.TestCase, TestClient):
"""Extends :mod:`unittest` to support WSGI/ASGI functional testing.

Note:
If available, uses :mod:`testtools` in lieu of
:mod:`unittest`.

This base class provides some extra plumbing for unittest-style
test cases, to help simulate WSGI or ASGI requests without having
to spin up an actual web server. Various simulation methods are
derived from :class:`falcon.testing.TestClient`.

Simply inherit from this class in your test case classes instead of
:class:`unittest.TestCase` or :class:`testtools.TestCase`.
"""

# NOTE(vytas): Here we have to restore __test__ to allow collecting tests!
__test__ = True

app: falcon.App
"""A WSGI or ASGI application to target when simulating
requests (defaults to ``falcon.App()``). When testing your
application, you will need to set this to your own instance
of :class:`falcon.App` or :class:`falcon.asgi.App`. For
example::

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
"""

def setUp(self) -> None:
super().setUp()

app = falcon.App()

# NOTE(kgriffs): Don't use super() to avoid triggering
# unittest.TestCase.__init__()
TestClient.__init__(self, app)

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
cat /tmp/inputs/falcon/testing/helpers.py | head -150

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

"""Testing utilities.

This module contains various testing utilities that can be accessed
directly from the `testing` package::

from falcon import testing

wsgi_environ = testing.create_environ()
"""

from __future__ import annotations

import asyncio
from collections import defaultdict
from collections import deque
from collections.abc import Iterable
from collections.abc import Iterator
from collections.abc import Mapping
import contextlib
from enum import auto
from enum import Enum
import io
import itertools
import json
import random
import re
import socket
import sys
import time
from typing import (
Any,
Callable,
TextIO,
)

import falcon
from falcon import errors as falcon_errors
from falcon._typing import CookieArg
from falcon._typing import HeaderArg
from falcon._typing import ResponseStatus
import falcon.asgi
from falcon.asgi_spec import AsgiEvent
from falcon.asgi_spec import EventType
from falcon.asgi_spec import ScopeType
from falcon.asgi_spec import WSCloseCode
from falcon.constants import SINGLETON_HEADERS
import falcon.request
from falcon.util import code_to_http_status
from falcon.util import uri
from falcon.util.mediatypes import parse_header

# NOTE(kgriffs): Changed in 3.0 from 'curl/7.24.0 (x86_64-apple-darwin12.0)'
DEFAULT_UA = 'falcon-client/' + falcon.__version__
DEFAULT_HOST = 'falconframework.org'


class ASGILifespanEventEmitter:
"""Emits ASGI lifespan events to an ASGI app.

This class can be used to drive a standard ASGI app callable in order to
perform functional tests on the app in question.

When simulating both lifespan and per-request events, each event stream
will require a separate invocation of the ASGI callable; one with a
lifespan event emitter, and one with a request event emitter. An
asyncio :class:`~asyncio.Condition` can be used to pause the
lifespan emitter until all of the desired request events have been
emitted.

Keyword Args:
shutting_down (asyncio.Condition): An instance of
:class:`asyncio.Condition` that will be awaited before
emitting the final shutdown event (``'lifespan.shutdown``).
"""

def __init__(self, shutting_down: asyncio.Condition) -> None:
self._state = 0
self._shutting_down = shutting_down

async def emit(self) -> AsgiEvent:
if self._state == 0:
self._state += 1
return {'type': EventType.LIFESPAN_STARTUP}

if self._state == 1:
self._state += 1
# NOTE(kgriffs): This verifies the app ignores events it does
#   not recognize.
return {'type': 'lifespan._nonstandard_event'}

async with self._shutting_down:
await self._shutting_down.wait()

return {'type': EventType.LIFESPAN_SHUTDOWN}

__call__ = emit


class ASGIRequestEventEmitter:
"""Emits events on-demand to an ASGI app.

This class can be used to drive a standard ASGI app callable in order to
perform functional tests on the app in question.

Note:
In order to ensure the app is able to handle subtle variations
in the ASGI events that are allowed by the specification, such
variations are applied to the emitted events at unspecified
intervals. This includes whether or not the `more_body` field
is explicitly set, or whether or not the request `body` chunk in
the event is occasionally empty,

Keyword Args:
body (str): The body content to use when emitting http.request
events. May be an empty string. If a byte string, it will
be used as-is; otherwise it will be encoded as UTF-8
(default ``b''``).
chunk_size (int): The maximum number of bytes to include in
a single http.request event (default 4096).
disconnect_at (float): The Unix timestamp after which to begin
emitting ``'http.disconnect'`` events (default now + 30s). The
value may be either an ``int`` or a ``float``, depending
on the precision required. Setting `disconnect_at` to
``0`` is treated as a special case, and will result in an
``'http.disconnect'`` event being immediately emitted (rather than
first emitting an ``'http.request'`` event).
"""

# TODO(kgriffs): If this pattern later becomes useful elsewhere,
#   factor out into a standalone helper class.
_branch_decider: dict[str, bool] = defaultdict(bool)

def __init__(
self,
body: str | bytes | None = None,
chunk_size: int | None = None,

bash
command
grep -n 'simulate_get\|simulate_request\|simulate_post\|headers\|TestClient\|Result' /tmp/inputs/falcon/testing/client.py | head -80

output
208:class _ResultBase:
214:        headers (list): A list of (header_name, header_value) tuples,
218:    def __init__(self, status: str, headers: HeaderIter) -> None:
221:        self._headers = CaseInsensitiveDict(headers)
224:        for name, value in headers:
232:        self._encoding = helpers.get_encoding_from_headers(self._headers)
245:    def headers(self) -> Headers:
246:        """A case-insensitive dictionary containing all the headers in the response,
253:            will "win" and be represented in `headers`.
255:        return self._headers  # type: ignore[return-value]
264:            client = testing.TestClient(app)
265:            response_one = client.simulate_get('/')
266:            response_two = client.simulate_post('/', cookies=response_one.cookies)
281:        return self.headers.get('Content-Type')
284:class ResultBodyStream:
321:class Result(_ResultBase):
329:        headers (list): A list of (header_name, header_value) tuples,
334:        self, iterable: Iterable[bytes], status: str, headers: HeaderIter
336:        super().__init__(status, headers)
380:        return 'Result<{}>'.format(repr_result)
398:            '[bold]Result[/]<[bold {}]{}[/] [italic yellow]{}[/] [grey50]{}[/]>'
416:class StreamedResult(_ResultBase):
424:        headers (list): A list of (header_name, header_value) tuples,
440:        headers: HeaderIter,
444:        super().__init__(status, headers)
447:        self._stream = ResultBodyStream(body_chunks)
451:    def stream(self) -> ResultBodyStream:
470:def simulate_request(
475:    headers: HeaderArg | None = None,
493:) -> Result:
545:            `headers` keyword argument. The ``falcon`` module provides a number
547:        headers (dict): Extra headers as a dict-like (Mapping) object, or an
568:            the `content_type` or `headers` arguments.
602:        :class:`~.Result`: The result of the request
607:            _simulate_request_asgi,
612:            headers=headers,
630:    path, query_string, headers, body, extras = _prepare_sim_args(
636:        headers,
647:        headers=headers,
663:        # simulate_get/post/patch etc methods.
677:    assert srmock.status is not None and srmock.headers is not None
678:    return Result(data, srmock.status, srmock.headers)
682:async def _simulate_request_asgi(
687:    headers: HeaderArg | None = ...,
705:) -> StreamedResult: ...
709:async def _simulate_request_asgi(
714:    headers: HeaderArg | None = ...,
732:) -> Result: ...
739:async def _simulate_request_asgi(
744:    headers: HeaderArg | None = None,
763:    #   simulate_request_asgi() as part of the public interface, we
767:) -> Result | StreamedResult:
808:            `headers` keyword argument. The ``falcon`` module provides a number
810:        headers (dict): Extra headers as a dict-like (Mapping) object, or an
831:            the `content_type` or `headers` arguments.
858:        :class:`~.Result`: The result of the request
861:    path, query_string, headers, body, extras = _prepare_sim_args(
867:        headers,
888:        headers=headers,
929:            #   status or headers to pass to StreamedResult.
933:            return StreamedResult(
936:                resp_event_collector.headers,
943:        return Result(
946:            resp_event_collector.headers,
996:    return Result(
999:        resp_event_collector.headers,
1007:    request as compared to :class:`~.TestClient`. In addition, the conductor's
1018:    that is similar to :class:`~.TestClient`, except that all ``simulate_*()``
1024:                    await conductor.simulate_post('/events', json={'id': i}):
1030:                # words, simulate_get() will emit a client disconnect event
1032:                result = await conductor.simulate_get('/events')
1034:                # Alternatively, we can use simulate_get_stream() as a context
1038:                async with conductor.simulate_get_stream('/events') as sr:
1068:    Similar to the :class:`TestClient`, :class:`ASGIConductor` also exposes
1080:        headers (dict): Default headers to set on every request (default
1082:            for the same headers to one of the ``simulate_*()`` methods.
1093:        headers: HeaderMapping | None = None,
1099:        self._default_headers = headers
1144:    async def simulate_get(self, path: str = '/', **kwargs: Any) -> Result:
1147:        (See also: :meth:`falcon.testing.simulate_get`)

bash
command
grep -n 'get_header\|set_header\|get_header' /tmp/inputs/falcon/request.py | head -30

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
1228:    def get_header(
1232:    def get_header(
1271:            # to access these instead of .get_header.
1284:    def get_header_as_int(self, header: str, required: Literal[True]) -> int: ...
1287:    def get_header_as_int(self, header: str, required: bool = ...) -> int | None: ...
1289:    def get_header_as_int(self, header: str, required: bool = False) -> int | None:
1312:        http_int = self.get_header(header, required=required)
1320:    def get_header_as_datetime(
1325:    def get_header_as_datetime(
1329:    def get_header_as_datetime(
1359:        http_date = self.get_header(header, required=required)
1392:            header_value = self.get_header('Cookie')

bash
command
grep -n 'def get_header\b' /tmp/inputs/falcon/request.py

output
1220:    def get_header(
1225:    def get_header(self, name: str, required: bool = ..., *, default: str) -> str: ...
1228:    def get_header(
1232:    def get_header(

bash
command
sed -n '1232,1285p' /tmp/inputs/falcon/request.py

output
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

raise errors.HTTPMissingHeader(name)

@overload
def get_header_as_int(self, header: str, required: Literal[True]) -> int: ...

bash
command
grep -n 'def set_header\|def get_header\|def delete_header' /tmp/inputs/falcon/response.py | head -20

output
663:    def get_header(self, name: str, default: str) -> str: ...
666:    def get_header(self, name: str, default: str | None = ...) -> str | None: ...
668:    def get_header(self, name: str, default: str | None = None) -> str | None:
700:    def set_header(self, name: str, value: str) -> None:
736:    def delete_header(self, name: str) -> None:
810:    def set_headers(

bash
command
grep -n 'def get_header\|def set_header' /tmp/inputs/falcon/asgi/request.py | head -20

output
733:    def get_header(
738:    def get_header(self, name: str, required: bool = ..., *, default: str) -> str: ...
741:    def get_header(
750:    def get_header(

bash
command
sed -n '663,760p' /tmp/inputs/falcon/response.py

output
    def get_header(self, name: str, default: str) -> str: ...

@overload
def get_header(self, name: str, default: str | None = ...) -> str | None: ...

def get_header(self, name: str, default: str | None = None) -> str | None:
"""Retrieve the raw string value for the given header.

Normally, when a header has multiple values, they will be
returned as a single, comma-delimited string. However, the
Set-Cookie header does not support this format, and so
attempting to retrieve it will raise an error.

Args:
name (str): Header name, case-insensitive. Must be of type ``str``
or ``StringType``, and only character values 0x00 through 0xFF
may be used on platforms that use wide characters.
Keyword Args:
default: Value to return if the header
is not found (default ``None``).

Raises:
ValueError: The value of the 'Set-Cookie' header(s) was requested.

Returns:
str: The value of the specified header if set, or
the default value if not set.
"""

# NOTE(kgriffs): normalize name by lowercasing it
name = name.lower()

if name == 'set-cookie':
raise HeaderNotSupported('Getting Set-Cookie is not currently supported.')

return self._headers.get(name, default)

def set_header(self, name: str, value: str) -> None:
"""Set a header for this response to a given value.

Warning:
Calling this method overwrites any values already set for this
header. To append an additional value for this header, use
:meth:`~.append_header` instead.

Warning:
This method cannot be used to set cookies; instead, use
:meth:`~.append_header` or :meth:`~.set_cookie`.

Args:
name (str): Header name (case-insensitive). The name may contain
only US-ASCII characters.
value (str): Value for the header. As with the header's name, the
value may contain only US-ASCII characters.

Raises:
ValueError: `name` cannot be ``'Set-Cookie'``.
"""

# NOTE(kgriffs): uwsgi fails with a TypeError if any header
# is not a str, so do the conversion here. It's actually
# faster to not do an isinstance check. str() will encode
# to US-ASCII.
value = str(value)

# NOTE(kgriffs): normalize name by lowercasing it
name = name.lower()

if name == 'set-cookie':
raise HeaderNotSupported('This method cannot be used to set cookies')

self._headers[name] = value

def delete_header(self, name: str) -> None:
"""Delete a header that was previously set for this response.

If the header was not previously set, nothing is done (no error is
raised). Otherwise, all values set for the header will be removed
from the response.

Note that calling this method is equivalent to setting the
corresponding header property (when said property is available) to
``None``. For example::

resp.etag = None

Warning:
This method cannot be used with the Set-Cookie header. Instead,
use :meth:`~.unset_cookie` to remove a cookie and ensure that the
user agent expires its own copy of the data as well.

Args:
name (str): Header name (case-insensitive). The name may
contain only US-ASCII characters.

Raises:
ValueError: `name` cannot be ``'Set-Cookie'``.
"""

bash
command
sed -n '750,820p' /tmp/inputs/falcon/asgi/request.py

output
    def get_header(
self,
name: str,
required: bool = False,
default: str | None = None,
_name_cache: dict[str, bytes] = {},
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

try:
asgi_name = _name_cache[name]
except KeyError:
asgi_name = name.lower().encode('latin1')
if len(_name_cache) < 64:  # Somewhat arbitrary ceiling to mitigate abuse
_name_cache[name] = asgi_name

# Use try..except to optimize for the header existing in most cases
try:
# Don't take the time to cache beforehand, using HTTP naming.
# This will be faster, assuming that most headers are looked
# up only once, and not all headers will be requested.
return self._asgi_headers[asgi_name].decode('latin1')

except KeyError:
if not required:
return default

raise errors.HTTPMissingHeader(name)

@overload
def get_param(
self,
name: str,
required: Literal[True],
store: StoreArg = ...,
default: str | None = ...,
) -> str: ...

@overload
def get_param(
self,
name: str,
required: bool = ...,
store: StoreArg = ...,
*,
default: str,
) -> str: ...

@overload
def get_param(

bash
command
cat /tmp/inputs/falcon/util/structures.py | grep -A 30 'class Context'

output
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

bash
command
grep -n 'UniversalMiddlewareWith\|process_request\|process_response\|process_request_async\|process_response_async' /tmp/inputs/falcon/_typing.py | head -40

output
231:    def process_request(self, req: _ReqT, resp: _RespT) -> None: ...
249:    def process_response(
279:    async def process_request(self, req: _AReqT, resp: _ARespT) -> None: ...
297:    async def process_response(
310:    async def process_request_ws(self, req: _AReqT, ws: WebSocket) -> None: ...
326:class UniversalMiddlewareWithProcessRequest(Protocol[_AReqT, _ARespT]):
329:    async def process_request_async(self, req: _AReqT, resp: _ARespT) -> None: ...
332:class UniversalMiddlewareWithProcessResource(Protocol[_AReqT, _ARespT]):
344:class UniversalMiddlewareWithProcessResponse(Protocol[_AReqT, _ARespT]):
347:    async def process_response_async(
381:    UniversalMiddlewareWithProcessRequest[_AReqT, _ARespT],
382:    UniversalMiddlewareWithProcessResource[_AReqT, _ARespT],
383:    UniversalMiddlewareWithProcessResponse[_AReqT, _ARespT],

bash
command
# Check how CORSMiddleware uses both process_response and process_response_async
# and understand the Universal pattern fully - look at the Protocol for our pattern
grep -n 'UniversalMiddlewareWithProcessRequest\|UniversalMiddlewareWithProcessResponse\|process_request_async' /tmp/inputs/falcon/_typing.py

output
326:class UniversalMiddlewareWithProcessRequest(Protocol[_AReqT, _ARespT]):
329:    async def process_request_async(self, req: _AReqT, resp: _ARespT) -> None: ...
344:class UniversalMiddlewareWithProcessResponse(Protocol[_AReqT, _ARespT]):
381:    UniversalMiddlewareWithProcessRequest[_AReqT, _ARespT],
383:    UniversalMiddlewareWithProcessResponse[_AReqT, _ARespT],

bash
command
# Look at how app.py processes middleware hooks - understand exactly when process_request fires
grep -n 'process_request\|process_response\|middleware' /tmp/inputs/falcon/app.py | head -60

output
61:from falcon.middleware import CORSMiddleware
112:        middleware: Either a single middleware component object or an iterable
114:            middleware component interface. Note that it is only necessary
116:            handle; Falcon simply skips over any missing middleware methods::
119:                    def process_request(self, req: Request, resp: Response) -> None:
126:                            within process_request().
163:                    def process_response(
183:            (See also: :ref:`Middleware <middleware>`)
199:        independent_middleware (bool): Set to ``False`` if response
200:            middleware should not be executed independently of whether or
201:            not request middleware raises an exception (default
202:            ``True``). When this option is set to ``False``, a middleware
203:            component's ``process_response()`` method will NOT be called
204:            when that same component's ``process_request()`` (or that of
210:            passed to the middleware argument to customize its behaviour.
242:        '_independent_middleware',
243:        '_middleware',
253:        '_unprepared_middleware',
260:    _independent_middleware: bool
261:    _middleware: helpers.PreparedMiddlewareResult
282:    _unprepared_middleware: list[SyncMiddleware[_ReqT, _RespT]]
302:        middleware: SyncMiddleware[_ReqT, _RespT]
306:        independent_middleware: bool = ...,
317:        middleware: SyncMiddleware[_ReqT, _RespT]
321:        independent_middleware: bool = ...,
332:        middleware: SyncMiddleware[_ReqT, _RespT]
336:        independent_middleware: bool = ...,
347:        middleware: SyncMiddleware[_ReqT, _RespT]
351:        independent_middleware: bool = ...,
361:        middleware: SyncMiddleware[_ReqT, _RespT]
365:        independent_middleware: bool = True,
375:        self._unprepared_middleware = []
376:        self._independent_middleware = independent_middleware
377:        self.add_middleware(middleware or [])
379:            self.add_middleware([CORSMiddleware()])
424:        mw_req_stack, mw_rsrc_stack, mw_resp_stack = self._middleware
432:            # NOTE(ealogar): The execution of request middleware
435:            # NOTE: if flag set to use independent middleware, execute
436:            # request middleware independently. Otherwise, only queue
437:            # response middleware after request middleware succeeds.
438:            if self._independent_middleware:
439:                for process_request in mw_req_stack:
440:                    process_request(req, resp)  # type: ignore[operator]
444:                for process_request, process_response in mw_req_stack:  # type: ignore[assignment,misc]
445:                    if process_request and not resp.complete:
446:                        process_request(req, resp)  # type: ignore[operator]
447:                    if process_response:
448:                        dependent_mw_resp_stack.insert(0, process_response)  # type: ignore[arg-type]
468:                # resource middleware methods. Resource will also be
469:                # None when a middleware method already set
472:                    # Call process_resource middleware methods.
486:        # Call process_response middleware methods.
487:        for process_response in mw_resp_stack or dependent_mw_resp_stack:
489:                process_response(req, resp, resource, req_succeeded)
566:    def add_middleware(
568:        middleware: SyncMiddleware[_ReqT, _RespT]
571:        """Add one or more additional middleware components.
574:            middleware: Either a single middleware component or an iterable
576:                order, as if they had been appended to the original middleware
581:        #   the chance that middleware may be empty.

bash
command
cat /tmp/inputs/falcon/app_helpers.py | grep -A 30 'PreparedMiddlewareResult\|_prepare_middleware\|process_request'

output
PreparedMiddlewareResult = tuple[
Union[
tuple[PRequest, ...], tuple[tuple[Optional[PRequest], Optional[PResource]], ...]
],
tuple[PResource, ...],
tuple[PResponse, ...],
]
AsyncPreparedMiddlewareResult = tuple[
Union[
tuple[APRequest, ...],
tuple[tuple[Optional[APRequest], Optional[APResource]], ...],
],
tuple[APResource, ...],
tuple[APResponse, ...],
]


@overload
def prepare_middleware(
middleware: Iterable[SyncMiddleware[_ReqT, _RespT]],
independent_middleware: bool = ...,
asgi: Literal[False] = ...,
) -> PreparedMiddlewareResult: ...


@overload
def prepare_middleware(
middleware: Iterable[AsyncMiddleware[_AReqT, _ARespT]],
independent_middleware: bool = ...,
*,
asgi: Literal[True],
) -> AsyncPreparedMiddlewareResult: ...


@overload
def prepare_middleware(
middleware: Iterable[SyncMiddleware[_ReqT, _RespT]]
| Iterable[AsyncMiddleware[_AReqT, _ARespT]],
independent_middleware: bool = ...,
asgi: bool = ...,
) -> PreparedMiddlewareResult | AsyncPreparedMiddlewareResult: ...


def prepare_middleware(
middleware: Iterable[SyncMiddleware[_ReqT, _RespT]]
| Iterable[AsyncMiddleware[_AReqT, _ARespT]],
independent_middleware: bool = False,
asgi: bool = False,
) -> PreparedMiddlewareResult | AsyncPreparedMiddlewareResult:
"""Check middleware interfaces and prepare the methods for request handling.

Note:
This method is only applicable to WSGI apps.

Arguments:
middleware (iterable): An iterable of middleware objects.

Keyword Args:
independent_middleware (bool): ``True`` if the request and
response middleware methods should be treated independently
(default ``False``)
asgi (bool): ``True`` if an ASGI app, ``False`` otherwise
(default ``False``)

Returns:
tuple: A tuple of prepared middleware method tuples
"""

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

--
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


def prepare_middleware_ws(
middleware: Iterable[AsyncMiddleware[_AReqT, _ARespT]],
) -> AsyncPreparedMiddlewareWsResult:
"""Check middleware interfaces and prepare WebSocket methods for request handling.

Note:
This method is only applicable to ASGI apps.

Arguments:
middleware (iterable): An iterable of middleware objects.

Returns:
tuple: A two-item ``(request_mw, resource_mw)`` tuple, where
*request_mw* is an ordered list of ``process_request_ws()`` methods,
and *resource_mw* is an ordered list of ``process_resource_ws()``
methods.
"""

# PERF(kgriffs): do getattr calls once, in advance, so we don't
# have to do them every time in the request path.
request_mw: list[AsgiProcessRequestWsMethod] = []
resource_mw: list[AsgiProcessResourceWsMethod] = []

process_request_ws: AsgiProcessRequestWsMethod | None
process_resource_ws: AsgiProcessResourceWsMethod | None

for component in middleware:
process_request_ws = util.get_bound_method(component, 'process_request_ws')
process_resource_ws = util.get_bound_method(component, 'process_resource_ws')

for m in (process_request_ws, process_resource_ws):
if not m:
continue

# NOTE(kgriffs): iscoroutinefunction() always returns False
#   for cythonized functions.
#
#   https://github.com/cython/cython/issues/2273
#   https://bugs.python.org/issue38225
#
if not iscoroutinefunction(m) and util.is_python_func(m):
msg = '{} must be implemented as an awaitable coroutine.'
raise CompatibilityError(msg.format(m))

if process_request_ws:
request_mw.append(process_request_ws)

if process_resource_ws:
resource_mw.append(process_resource_ws)

return tuple(request_mw), tuple(resource_mw)


def default_serialize_error(req: Request, resp: Response, exception: HTTPError) -> None:
"""Serialize the given instance of HTTPError.

This function determines which of the supported media types, if
any, are acceptable by the client, and serializes the error
to the preferred type.

Currently, JSON and XML are the only supported media types. If the
client accepts both JSON and XML with equal weight, JSON will be
chosen.

Other media types can be supported by using a custom error serializer.

Note:
If a custom media type is used and the type includes a
"+json" or "+xml" suffix, the error will be serialized
to JSON or XML, respectively. If this behavior is not
desirable, a custom error serializer may be used to
override this one.

Args:
req: Instance of ``falcon.Request``
resp: Instance of ``falcon.Response``

bash
command
grep -n 'process_request_async\|process_response_async' /tmp/inputs/falcon/asgi/app.py | head -30

system
Tool ran without output or errors

bash
command
grep -n 'process_request_async\|process_response_async' /tmp/inputs/falcon/asgi/app.py | head -20

system
Tool ran without output or errors

bash
command
grep -n 'uuid\|UUID' /tmp/inputs/falcon/request.py | head -10

output
31:from uuid import UUID
1736:    def get_param_as_uuid(
1741:        default: UUID | None = ...,
1742:    ) -> UUID: ...
1745:    def get_param_as_uuid(
1751:        default: UUID,
1752:    ) -> UUID: ...
1755:    def get_param_as_uuid(
1760:        default: UUID | None = ...,
1761:    ) -> UUID | None: ...

bash
command
# Confirm the ASGI app's process_request_async lookup - see how it finds _async methods
grep -n '_async\|process_request\b' /tmp/inputs/falcon/asgi/app.py | head -30

output
70:from falcon.util.sync import wrap_sync_to_async
137:                with an `*_async` postfix (see also:
188:                    async def process_request(
197:                            within process_request().
263:                            attribute to a new value from within process_request().
319:            when that same component's ``process_request()`` (or that of
341:        responders.bad_request_async  # type: ignore[assignment]
344:        responders.path_not_found_async  # type: ignore[assignment]
541:                for process_request in mw_req_stack:
542:                    await process_request(req, resp)  # type: ignore[operator]
547:                for process_request, process_response in mw_req_stack:  # type: ignore[misc, assignment]
548:                    if process_request and not resp.complete:
549:                        await process_request(req, resp)  # type: ignore[operator]
633:                                resp._media_rendered = await handler.serialize_async(
716:                    'resp.sse = some_asyncgen_function()'
881:                            'resp.stream = some_asyncgen_function()'
932:                sink = wrap_sync_to_async(sink)
1115:        for cb, is_async in callbacks or ():
1116:            if is_async:

bash
command
# Look at how the ASGI request handles get_header for X-Request-ID (header name casing, byte lookup)
sed -n '750,800p' /tmp/inputs/falcon/asgi/request.py

output
    def get_header(
self,
name: str,
required: bool = False,
default: str | None = None,
_name_cache: dict[str, bytes] = {},
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

try:
asgi_name = _name_cache[name]
except KeyError:
asgi_name = name.lower().encode('latin1')
if len(_name_cache) < 64:  # Somewhat arbitrary ceiling to mitigate abuse
_name_cache[name] = asgi_name

# Use try..except to optimize for the header existing in most cases
try:
# Don't take the time to cache beforehand, using HTTP naming.
# This will be faster, assuming that most headers are looked
# up only once, and not all headers will be requested.
return self._asgi_headers[asgi_name].decode('latin1')

except KeyError:
if not required:
return default

raise errors.HTTPMissingHeader(name)

@overload

bash
command
# Check how CORSMiddleware's process_response_async delegates to the sync version - confirm the pattern
grep -n 'process_response_async\|process_request_async' /tmp/inputs/falcon/middleware.py

output
166:    async def process_response_async(

bash
command
# Understand UUID4 format so tests can validate it properly
python3 -c "import uuid; u = uuid.uuid4(); print(repr(str(u))); print(len(str(u)))"

output
'3317cc0b-1cc7-4e5b-ac28-481db88fb7df'
36

bash
command
# Understand exactly what simulate_get returns and how to read response headers from it
grep -n 'class Result\b\|def headers\b\|\.headers\.' /tmp/inputs/falcon/testing/client.py | head -30

output
245:    def headers(self) -> Headers:
281:        return self.headers.get('Content-Type')
321:class Result(_ResultBase):

bash
command
sed -n '321,415p' /tmp/inputs/falcon/testing/client.py

output
class Result(_ResultBase):
"""Encapsulates the result of a simulated request.

Args:
iterable (iterable): An iterable that yields zero or more
bytestrings, per PEP-3333
status (str): An HTTP status string, including status code and
reason string
headers (list): A list of (header_name, header_value) tuples,
per PEP-3333
"""

def __init__(
self, iterable: Iterable[bytes], status: str, headers: HeaderIter
) -> None:
super().__init__(status, headers)

self._text: str | None = None
self._content = b''.join(iterable)

@property
def content(self) -> bytes:
"""Raw response body, or an ``b''`` if the response body was empty."""
return self._content

@property
def text(self) -> str:
"""Decoded response body of type ``str``.

If the content type does not specify an encoding, UTF-8 is assumed.
"""
if self._text is None:
if not self.content:
self._text = ''
else:
if self.encoding is None:
encoding = 'UTF-8'
else:
encoding = self.encoding

self._text = self.content.decode(encoding)

return self._text

@property
def json(self) -> Any:
"""Deserialized JSON body.

Will be ``None`` if the body has no content to deserialize.
Otherwise, raises an error if the response is not valid JSON.
"""
if not self.text:
return None

return json_module.loads(self.text)

def __repr__(self) -> str:
repr_result = ' '.join(filter(None, self._prepare_repr_args()))

return 'Result<{}>'.format(repr_result)

def __rich__(self) -> str:
status, content_type, content = self._prepare_repr_args()

status_color: str

for prefix, color in (
('1', 'blue'),
('2', 'green'),
('3', 'magenta'),
('4', 'red'),
('5', 'red'),
):
if status.startswith(prefix):
status_color = color

result_template = (
'[bold]Result[/]<[bold {}]{}[/] [italic yellow]{}[/] [grey50]{}[/]>'
)

return result_template.format(status_color, status, content_type, content)

def _prepare_repr_args(self) -> list[str]:
content_type = self.content_type or ''

if len(self.content) > 40:
content = self.content[:20] + b'...' + self.content[-20:]
else:
content = self.content

repr_args = [self.status, content_type, str(content)]

return repr_args


bash
command
# Understand how _ResultBase stores headers - CaseInsensitiveDict
sed -n '208,250p' /tmp/inputs/falcon/testing/client.py

output
class _ResultBase:
"""Base class for the result of a simulated request.

Args:
status (str): An HTTP status string, including status code and
reason string
headers (list): A list of (header_name, header_value) tuples,
per PEP-3333
"""

def __init__(self, status: str, headers: HeaderIter) -> None:
self._status = status
self._status_code = int(status[:3])
self._headers = CaseInsensitiveDict(headers)

cookies = http_cookies.SimpleCookie()
for name, value in headers:
if name.lower() == 'set-cookie':
cookies.load(value)

self._cookies = dict(
(morsel.key, Cookie(morsel)) for morsel in cookies.values()
)

self._encoding = helpers.get_encoding_from_headers(self._headers)

@property
def status(self) -> str:
"""HTTP status string given in the response."""
return self._status

@property
def status_code(self) -> int:
"""The code portion of the HTTP status string."""
return self._status_code

@property
def headers(self) -> Headers:
"""A case-insensitive dictionary containing all the headers in the response,
except for cookies, which may be accessed via the `cookies` attribute.

Note:

bash
command
# Look at CaseInsensitiveDict to understand header access patterns
grep -n 'class CaseInsensitiveDict\|def __getitem__\|def get\b' /tmp/inputs/falcon/util/structures.py | head -20

output
46:class CaseInsensitiveDict(MutableMapping):  # pragma: no cover
85:    def __getitem__(self, key: str) -> Any:
164:    def __getitem__(self, key: str) -> Any | None:
210:    def get(self, key: str, default: Any | None = None) -> Any | None:

bash
command
# Understand how simulate_get passes headers into requests (for the X-Request-ID case)
sed -n '470,640p' /tmp/inputs/falcon/testing/client.py

output
def simulate_request(
app: Callable[..., Any],  # accept any asgi/wsgi app
method: str = 'GET',
path: str = '/',
query_string: str | None = None,
headers: HeaderArg | None = None,
content_type: str | None = None,
body: str | bytes | None = None,
json: Any | None = None,
file_wrapper: Callable[..., Any] | None = None,
wsgierrors: TextIO | None = None,
params: Mapping[str, Any] | None = None,
params_csv: bool = False,
protocol: str = 'http',
host: str = helpers.DEFAULT_HOST,
remote_addr: str | None = None,
extras: Mapping[str, Any] | None = None,
http_version: str = '1.1',
port: int | None = None,
root_path: str | None = None,
cookies: CookieArg | None = None,
asgi_chunk_size: int = 4096,
asgi_disconnect_ttl: int = 300,
) -> Result:
"""Simulate a request to a WSGI or ASGI application.

Performs a request against a WSGI or ASGI application. In the case of
WSGI, uses :any:`wsgiref.validate` to ensure the response is valid.

Note:
In the case of an ASGI request, this method will simulate the entire
app lifecycle in a single shot, including lifespan and client
disconnect events. In order to simulate multiple interleaved
requests, or to test a streaming endpoint (such as one that emits
server-sent events), :class:`~falcon.testing.ASGIConductor` can be
used to more precisely control the app lifecycle.

Keyword Args:
app (callable): The WSGI or ASGI application to call
method (str): An HTTP method to use in the request
(default: 'GET')
path (str): The URL path to request (default: '/').

Note:
The path may contain a query string. However, neither
`query_string` nor `params` may be specified in this case.

root_path (str): The initial portion of the request URL's "path" that
corresponds to the application object, so that the application
knows its virtual "location". This defaults to the empty string,
indicating that the application corresponds to the "root" of the
server.
protocol: The protocol to use for the URL scheme
(default: 'http')
port (int): The TCP port to simulate. Defaults to
the standard port used by the given scheme (i.e., 80 for 'http'
and 443 for 'https'). A string may also be passed, as long as
it can be parsed as an int.
params (dict): A dictionary of query string parameters,
where each key is a parameter name, and each value is
either a ``str`` or something that can be converted
into a ``str``, or a list of such values. If a ``list``,
the value will be converted to a comma-delimited string
of values (e.g., 'thing=1,2,3').
params_csv (bool): Set to ``True`` to encode list values
in query string params as comma-separated values
(e.g., 'thing=1,2,3'). Otherwise, parameters will be encoded by
specifying multiple instances of the parameter
(e.g., 'thing=1&thing=2&thing=3'). Defaults to ``False``.
query_string (str): A raw query string to include in the
request (default: ``None``). If specified, overrides
`params`.
content_type (str): The value to use for the Content-Type header in
the request. If specified, this value will take precedence over
any value set for the Content-Type header in the
`headers` keyword argument. The ``falcon`` module provides a number
of :ref:`constants for common media types <media_type_constants>`.
headers (dict): Extra headers as a dict-like (Mapping) object, or an
iterable yielding a series of two-member (*name*, *value*)
iterables. Each pair of strings provides the name and value
for an HTTP header. If desired, multiple header values may be
combined into a single (*name*, *value*) pair by joining the values
with a comma when the header in question supports the list
format (see also RFC 7230 and RFC 7231). Header names are not
case-sensitive.

Note:
If a User-Agent header is not provided, it will default to::

f'falcon-client/{falcon.__version__}'

body (str): The body of the request (default ''). The value will be
encoded as UTF-8 in the WSGI environ. Alternatively, a byte string
may be passed, in which case it will be used as-is.
json(JSON serializable): A JSON document to serialize as the
body of the request (default: ``None``). If specified,
overrides `body` and sets the Content-Type header to
``'application/json'``, overriding any value specified by either
the `content_type` or `headers` arguments.
file_wrapper (callable): Callable that returns an iterable,
to be used as the value for *wsgi.file_wrapper* in the
WSGI environ (default: ``None``). This can be used to test
high-performance file transmission when `resp.stream` is
set to a file-like object.
host(str): A string to use for the hostname part of the fully
qualified request URL (default: 'falconframework.org')
remote_addr (str): A string to use as the remote IP address for the
request (default: '127.0.0.1'). For WSGI, this corresponds to
the 'REMOTE_ADDR' environ variable. For ASGI, this corresponds
to the IP address used for the 'client' field in the connection
scope.
http_version (str): The HTTP version to simulate. Must be either
'2', '2.0', 1.1', '1.0', or '1' (default '1.1'). If set to '1.0',
the Host header will not be added to the scope.
wsgierrors (io): The stream to use as *wsgierrors* in the WSGI
environ (default ``sys.stderr``)
asgi_chunk_size (int): The maximum number of bytes that will be
sent to the ASGI app in a single ``'http.request'`` event (default
4096).
asgi_disconnect_ttl (int): The maximum number of seconds to wait
since the request was initiated, before emitting an
``'http.disconnect'`` event when the app calls the
receive() function (default 300).
extras (dict): Additional values to add to the WSGI
``environ`` dictionary or the ASGI scope for the request
(default: ``None``)
cookies (dict): Cookies as a dict-like (Mapping) object, or an
iterable yielding a series of two-member (*name*, *value*)
iterables. Each pair of items provides the name and value
for the 'Set-Cookie' header.

Returns:
:class:`~.Result`: The result of the request
"""

if _is_asgi_app(app):
return async_to_sync(  # type: ignore[return-value]
_simulate_request_asgi,
app,
method=method,
path=path,
query_string=query_string,
headers=headers,
content_type=content_type,
body=body,
json=json,
params=params,
params_csv=params_csv,
protocol=protocol,
host=host,
remote_addr=remote_addr,
extras=extras,
http_version=http_version,
port=port,
root_path=root_path,
asgi_chunk_size=asgi_chunk_size,
asgi_disconnect_ttl=asgi_disconnect_ttl,
cookies=cookies,
)

path, query_string, headers, body, extras = _prepare_sim_args(
path,
query_string,
params,
params_csv,
content_type,
headers,
body,
json,
extras,
)
Now I have a thorough understanding of the entire codebase. Let me set up the working environment and then write the code.
bash
command
cp -r /tmp/inputs/falcon /tmp/outputs/falcon
pip install falcon pytest --quiet 2>&1 | tail -5

system
Tool ran without output or errors

bash
command
cd /tmp/outputs && python -c "import sys; sys.path.insert(0, '.'); import falcon; print(falcon.__version__)"

output
4.3.0.dev1

bash
command
# Confirm the UUID regex pattern that covers all uuid4 strings
python3 -c "
import uuid, re
pattern = re.compile(r'^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
for _ in range(10000):
    assert pattern.match(str(uuid.uuid4())), 'pattern miss'
print('All 10000 uuid4 strings matched')
"

output
All 10000 uuid4 strings matched

bash
command
# Confirm exactly how the WSGI env key is formed for X-Request-ID
# WSGI: header name → strip HTTP_, upper, replace - with _
# So 'X-Request-ID' → env key 'HTTP_X_REQUEST_ID'
python3 -c "
name = 'X-Request-ID'
wsgi_name = name.upper().replace('-', '_')
print('WSGI key:', 'HTTP_' + wsgi_name)
# And the reverse: env key back to header form
env_key = 'HTTP_X_REQUEST_ID'
header_form = env_key[5:].replace('_', '-')
print('Header form from env key:', header_form)
"

output
WSGI key: HTTP_X_REQUEST_ID
Header form from env key: X-REQUEST-ID

bash
command
# Confirm req.get_header('X-Request-ID') actually works end-to-end by tracing the wsgi env lookup
python3 -c "
import sys; sys.path.insert(0, '/tmp/outputs')
import falcon, falcon.testing

app = falcon.App()

captured = {}

class ProbeMiddleware:
    def process_request(self, req, resp):
        captured['header_val'] = req.get_header('X-Request-ID')

app.add_middleware(ProbeMiddleware())

class Root:
    def on_get(self, req, resp):
        pass

app.add_route('/', Root())

client = falcon.testing.TestClient(app)
result = client.simulate_get('/', headers={'X-Request-ID': 'test-abc-123'})
print('Captured header:', captured['header_val'])
print('Status:', result.status_code)
"

output
Captured header: test-abc-123
Status: 200

bash
command
# Confirm resp.set_header and result.headers['X-Request-ID'] round-trip
python3 -c "
import sys; sys.path.insert(0, '/tmp/outputs')
import falcon, falcon.testing

app = falcon.App()

class SetHeaderMiddleware:
    def process_response(self, req, resp, resource, req_succeeded):
        resp.set_header('X-Request-ID', 'round-trip-value')

app.add_middleware(SetHeaderMiddleware())

class Root:
    def on_get(self, req, resp):
        pass

app.add_route('/', Root())

client = falcon.testing.TestClient(app)
result = client.simulate_get('/')
print('Response header X-Request-ID:', result.headers.get('X-Request-ID'))
"

output
Response header X-Request-ID: round-trip-value

bash
command
# Confirm req.context attribute assignment and retrieval in a handler
python3 -c "
import sys; sys.path.insert(0, '/tmp/outputs')
import falcon, falcon.testing

app = falcon.App()

context_values = {}

class ContextMiddleware:
    def process_request(self, req, resp):
        req.context.request_id = 'ctx-value-123'

class Root:
    def on_get(self, req, resp):
        context_values['from_handler'] = req.context.request_id

app.add_middleware(ContextMiddleware())
app.add_route('/', Root())

client = falcon.testing.TestClient(app)
result = client.simulate_get('/')
print('Context value from handler:', context_values['from_handler'])
"

output
Context value from handler: ctx-value-123

bash
command
# Confirm the UniversalMiddlewareWithProcessRequest Protocol for WSGI+ASGI side-by-side pattern
# CORSMiddleware uses UniversalMiddlewareWithProcessResponse (has process_response + process_response_async)
# Our middleware needs process_request + process_request_async (to set context early) + process_response + process_response_async
# Verify that having both pairs side-by-side is valid for the prepare_middleware logic
grep -n 'UniversalMiddlewareWith\|process_request_async\|process_response_async' /tmp/inputs/falcon/app_helpers.py | head -30

output
139:                component, 'process_request_async'
152:                util.get_bound_method(component, 'process_response_async')

bash
command
sed -n '130,170p' /tmp/inputs/falcon/app_helpers.py

output
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

bash
command
# Confirm that having both process_request + process_request_async AND process_response + process_response_async
# on the same class works correctly in the ASGI app - the _async methods take priority
python3 -c "
import sys; sys.path.insert(0, '/tmp/outputs')
import falcon, falcon.testing, asyncio

app = falcon.App()

class DualMiddleware:
    def process_request(self, req, resp):
        req.context.seen = 'wsgi_request'
    async def process_request_async(self, req, resp):
        req.context.seen = 'asgi_request'
    def process_response(self, req, resp, resource, req_succeeded):
        resp.set_header('X-Seen', req.context.seen)
    async def process_response_async(self, req, resp, resource, req_succeeded):
        resp.set_header('X-Seen', req.context.seen)

app.add_middleware(DualMiddleware())

class Root:
    def on_get(self, req, resp):
        pass

app.add_route('/', Root())

client = falcon.testing.TestClient(app)
result = client.simulate_get('/')
print('WSGI seen header:', result.headers.get('X-Seen'))
print('Status:', result.status_code)
"

output
WSGI seen header: wsgi_request
Status: 200

bash
command
# Check what happens when a client sends a non-UUID X-Request-ID value (arbitrary string)
# The design should pass it through as-is - just confirm there's no hidden sanitisation in get_header
python3 -c "
import sys; sys.path.insert(0, '/tmp/outputs')
import falcon, falcon.testing

app = falcon.App()
captured = {}

class ProbeMiddleware:
    def process_request(self, req, resp):
        captured['val'] = req.get_header('X-Request-ID')

app.add_middleware(ProbeMiddleware())

class Root:
    def on_get(self, req, resp): pass

app.add_route('/', Root())
client = falcon.testing.TestClient(app)

# Arbitrary client-supplied value
result = client.simulate_get('/', headers={'X-Request-ID': 'my-custom-trace-id'})
print('Captured:', captured['val'])
"

output
Captured: my-custom-trace-id
Good. Now I have everything I need. Let me write the implementation and tests.
str_replace_based_edit_tool
command
str_replace
path
/tmp/outputs/falcon/middleware.py
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

from ._typing import UniversalMiddlewareWithProcessResponse

if TYPE_CHECKING:
    from .asgi.request import Request as AsgiRequest
    from .asgi.response import Response as AsgiResponse
    from .request import Request
    from .response import Response

output
The file /tmp/outputs/falcon/middleware.py has been edited successfully.

bash
command
cat >> /tmp/outputs/falcon/middleware.py << 'EOF'


class RequestIDMiddleware:
    """Middleware that tracks a unique request ID throughout the request cycle.

    For each incoming request the middleware:

    1. Inspects the ``X-Request-ID`` header supplied by the client.
    2. Uses that value as-is when it is present, or generates a new
       :func:`uuid.uuid4` string when it is absent.
    3. Stores the resolved ID on ``req.context.request_id`` so that any
       downstream resource handler or hook can read it without touching
       headers directly.
    4. Echoes the same ID back to the caller via the ``X-Request-ID``
       response header.

    The middleware is compatible with both WSGI and ASGI applications.
    WSGI apps use the synchronous ``process_request`` / ``process_response``
    pair; ASGI apps use the ``*_async`` counterparts.  The logic is
    identical in both cases: the ``*_async`` methods simply delegate to the
    synchronous implementations, exactly as :class:`CORSMiddleware` does.

    Example::

        import falcon
        from falcon.middleware import RequestIDMiddleware

        app = falcon.App(middleware=[RequestIDMiddleware()])

        class OrderResource:
            def on_get(self, req, resp, order_id):
                # The request ID is always available here.
                rid = req.context.request_id
                resp.media = {'order_id': order_id, 'request_id': rid}

        app.add_route('/orders/{order_id}', OrderResource())

    The client may pin its own correlation ID::

        GET /orders/42 HTTP/1.1
        X-Request-ID: my-trace-abc-123

    and the same value will be reflected in the response::

        HTTP/1.1 200 OK
        X-Request-ID: my-trace-abc-123

    When the client omits the header a fresh UUID-4 is generated and
    returned::

        HTTP/1.1 200 OK
        X-Request-ID: 3317cc0b-1cc7-4e5b-ac28-481db88fb7df
    """

    # ------------------------------------------------------------------
    # WSGI interface
    # ------------------------------------------------------------------

    def process_request(self, req: Request, resp: Response) -> None:
        """Resolve the request ID and store it on ``req.context``.

        If the client supplied an ``X-Request-ID`` header its value is used
        unchanged.  Otherwise a new UUID-4 string is generated.  Either way
        the resolved ID is assigned to ``req.context.request_id``.

        Args:
            req: The WSGI (or ASGI) request object for the current request.
            resp: The WSGI (or ASGI) response object for the current request.
        """
        incoming = req.get_header('X-Request-ID')
        req.context.request_id = incoming if incoming is not None else str(uuid.uuid4())

    def process_response(
        self,
        req: Request,
        resp: Response,
        resource: object,
        req_succeeded: bool,
    ) -> None:
        """Copy the request ID from ``req.context`` to the response header.

        The ``X-Request-ID`` response header is set to the same value that
        was stored on ``req.context.request_id`` by :meth:`process_request`,
        ensuring the caller can correlate the response with the originating
        request regardless of whether the ID was client-supplied or
        auto-generated.

        Args:
            req: The WSGI (or ASGI) request object for the current request.
            resp: The WSGI (or ASGI) response object for the current request.
            resource: The resource object to which the request was routed,
                or ``None`` if routing did not succeed.
            req_succeeded: ``True`` if no exception was raised while the
                request was being processed, ``False`` otherwise.
        """
        resp.set_header('X-Request-ID', req.context.request_id)

    # ------------------------------------------------------------------
    # ASGI interface (delegates to the synchronous implementations above)
    # ------------------------------------------------------------------

    async def process_request_async(
        self, req: AsgiRequest, resp: AsgiResponse
    ) -> None:
        """ASGI counterpart of :meth:`process_request`."""
        self.process_request(req, resp)  # type: ignore[arg-type]

    async def process_response_async(
        self,
        req: AsgiRequest,
        resp: AsgiResponse,
        resource: object,
        req_succeeded: bool,
    ) -> None:
        """ASGI counterpart of :meth:`process_response`."""
        self.process_response(req, resp, resource, req_succeeded)  # type: ignore[arg-type]
EOF

system
Tool ran without output or errors
Now add the export to `__init__.py`:
str_replace_based_edit_tool
command
str_replace
path
/tmp/outputs/falcon/__init__.py
old_str
    # API interface
    'API',
    'App',
    'after',
    'before',
    'BoundedStream',
    'CORSMiddleware',
new_str
    # API interface
    'API',
    'App',
    'after',
    'before',
    'BoundedStream',
    'CORSMiddleware',
    'RequestIDMiddleware',

output
The file /tmp/outputs/falcon/__init__.py has been edited successfully.

str_replace_based_edit_tool
command
str_replace
path
/tmp/outputs/falcon/__init__.py
old_str
from falcon.middleware import CORSMiddleware
new_str
from falcon.middleware import CORSMiddleware
from falcon.middleware import RequestIDMiddleware

output
The file /tmp/outputs/falcon/__init__.py has been edited successfully.
Now write the tests:
str_replace_based_edit_tool
command
create
path
/tmp/outputs/tests/test_request_id_middleware.py
file_text
"""Tests for falcon.middleware.RequestIDMiddleware.

Coverage matrix
---------------
Each public behaviour of the middleware is exercised by at least one focused
test, and a small number of integration tests confirm that everything works
together through the full Falcon request/response pipeline.

Behaviour                                              | Test(s)
-------------------------------------------------------|------------------------------
Client supplies X-Request-ID → value is reused         | test_provided_id_is_reused,
                                                       | test_provided_id_in_context,
                                                       | test_provided_id_in_response_header
Client omits X-Request-ID → UUID-4 is auto-generated  | test_auto_generated_id_is_uuid4,
                                                       | test_auto_generated_id_in_context,
                                                       | test_auto_generated_id_in_response_header
req.context.request_id is accessible in the handler   | test_context_accessible_in_handler_provided,
                                                       | test_context_accessible_in_handler_generated
X-Request-ID response header is always present         | test_response_header_present_without_incoming,
                                                       | test_response_header_present_with_incoming
Each request gets an independent ID                    | test_each_request_gets_independent_id
Export through the top-level falcon package            | test_importable_from_falcon_package
Direct import from falcon.middleware                   | test_importable_from_falcon_middleware
"""

from __future__ import annotations

import re
import sys
import os

# Make the local source tree the primary import target so that we test the
# modified package rather than any installed copy.
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import falcon
import falcon.testing
from falcon.middleware import RequestIDMiddleware

# ---------------------------------------------------------------------------
# Helpers shared across all tests
# ---------------------------------------------------------------------------

# RFC-4122 UUID-4 canonical string representation pattern.
# Version nibble must be '4'; variant nibble must be one of 8, 9, a, b.
_UUID4_RE = re.compile(
    r'^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
)


def _make_app(*, capture_store: dict | None = None) -> tuple[falcon.App, falcon.testing.TestClient]:
    """Return a minimal Falcon app that has *only* RequestIDMiddleware active.

    If *capture_store* is supplied, the resource handler writes
    ``req.context.request_id`` into ``capture_store['request_id']`` so the
    test can inspect the context value that the handler sees.
    """
    app = falcon.App(middleware=[RequestIDMiddleware()])

    class _Resource:
        def on_get(self, req: falcon.Request, resp: falcon.Response) -> None:
            if capture_store is not None:
                capture_store['request_id'] = req.context.request_id
            resp.media = {'ok': True}

    app.add_route('/', _Resource())
    return app, falcon.testing.TestClient(app)


# ---------------------------------------------------------------------------
# Tests: client-supplied X-Request-ID header
# ---------------------------------------------------------------------------


class TestProvidedRequestID:
    """The middleware must reuse the X-Request-ID value given by the client."""

    SUPPLIED_ID = 'my-trace-id-abc-123'

    def _result(self) -> tuple[falcon.testing.Result, dict]:
        store: dict = {}
        _, client = _make_app(capture_store=store)
        result = client.simulate_get('/', headers={'X-Request-ID': self.SUPPLIED_ID})
        return result, store

    def test_provided_id_is_reused(self) -> None:
        """The client-supplied value must not be replaced by the middleware."""
        result, store = self._result()
        # Both the response header and the context should carry the exact same
        # string the client sent — no transformation, no UUID generation.
        assert store['request_id'] == self.SUPPLIED_ID

    def test_provided_id_in_context(self) -> None:
        """req.context.request_id must equal the client-supplied value."""
        _, store = self._result()
        assert store['request_id'] == self.SUPPLIED_ID

    def test_provided_id_in_response_header(self) -> None:
        """X-Request-ID response header must echo the client-supplied value."""
        result, _ = self._result()
        assert result.headers.get('X-Request-ID') == self.SUPPLIED_ID


# ---------------------------------------------------------------------------
# Tests: auto-generation when X-Request-ID is absent
# ---------------------------------------------------------------------------


class TestAutoGeneratedRequestID:
    """When the client omits X-Request-ID the middleware must generate a UUID-4."""

    def _result(self) -> tuple[falcon.testing.Result, dict]:
        store: dict = {}
        _, client = _make_app(capture_store=store)
        # No X-Request-ID header supplied.
        result = client.simulate_get('/')
        return result, store

    def test_auto_generated_id_is_uuid4(self) -> None:
        """The auto-generated value must be a canonical RFC-4122 UUID-4 string."""
        result, _ = self._result()
        generated = result.headers.get('X-Request-ID')
        assert generated is not None, 'X-Request-ID header must be present'
        assert _UUID4_RE.match(generated), (
            f'Expected a UUID-4 string, got: {generated!r}'
        )

    def test_auto_generated_id_in_context(self) -> None:
        """req.context.request_id must be set and be a valid UUID-4."""
        _, store = self._result()
        generated = store.get('request_id')
        assert generated is not None, 'req.context.request_id must be set'
        assert _UUID4_RE.match(generated), (
            f'Expected a UUID-4 string in context, got: {generated!r}'
        )

    def test_auto_generated_id_in_response_header(self) -> None:
        """X-Request-ID response header must be present and be a valid UUID-4."""
        result, _ = self._result()
        header_val = result.headers.get('X-Request-ID')
        assert header_val is not None, 'X-Request-ID response header must be present'
        assert _UUID4_RE.match(header_val), (
            f'Response header is not a UUID-4 string: {header_val!r}'
        )


# ---------------------------------------------------------------------------
# Tests: req.context accessibility in resource handlers
# ---------------------------------------------------------------------------


class TestContextAccessibility:
    """req.context.request_id must be readable inside every resource handler."""

    def test_context_accessible_in_handler_provided(self) -> None:
        """Handler can read req.context.request_id when the ID was client-provided."""
        supplied = 'trace-from-handler-test'
        store: dict = {}
        _, client = _make_app(capture_store=store)
        client.simulate_get('/', headers={'X-Request-ID': supplied})

        # The handler must have seen the exact same value.
        assert store.get('request_id') == supplied

    def test_context_accessible_in_handler_generated(self) -> None:
        """Handler can read req.context.request_id when the ID was auto-generated."""
        store: dict = {}
        _, client = _make_app(capture_store=store)
        client.simulate_get('/')

        ctx_id = store.get('request_id')
        assert ctx_id is not None, 'req.context.request_id must be set by the time the handler runs'
        assert _UUID4_RE.match(ctx_id), (
            f'Context request_id is not a UUID-4 string: {ctx_id!r}'
        )


# ---------------------------------------------------------------------------
# Tests: response header always present
# ---------------------------------------------------------------------------


class TestResponseHeaderAlwaysPresent:
    """X-Request-ID must appear in every response, regardless of the request."""

    def test_response_header_present_without_incoming(self) -> None:
        """X-Request-ID response header must be set even when the client omitted it."""
        _, client = _make_app()
        result = client.simulate_get('/')
        assert 'X-Request-ID' in result.headers, (
            'X-Request-ID response header must be present when no header was supplied'
        )

    def test_response_header_present_with_incoming(self) -> None:
        """X-Request-ID response header must be set when the client did supply it."""
        _, client = _make_app()
        result = client.simulate_get('/', headers={'X-Request-ID': 'present-test-id'})
        assert 'X-Request-ID' in result.headers, (
            'X-Request-ID response header must be present when a header was supplied'
        )


# ---------------------------------------------------------------------------
# Tests: request isolation
# ---------------------------------------------------------------------------


class TestRequestIsolation:
    """Each request must receive an independent request ID."""

    def test_each_request_gets_independent_id(self) -> None:
        """Two back-to-back requests without X-Request-ID must get different IDs.

        This guards against any accidental shared mutable state inside the
        middleware instance (e.g., a class-level ID that gets reused).
        """
        _, client = _make_app()

        ids: list[str] = []
        for _ in range(5):
            result = client.simulate_get('/')
            rid = result.headers.get('X-Request-ID')
            assert rid is not None
            assert _UUID4_RE.match(rid), f'Not a UUID-4: {rid!r}'
            ids.append(rid)

        # All five IDs must be distinct.
        assert len(set(ids)) == 5, (
            f'Expected 5 unique request IDs but got duplicates: {ids}'
        )


# ---------------------------------------------------------------------------
# Tests: context and response header values are always consistent
# ---------------------------------------------------------------------------


class TestContextAndHeaderConsistency:
    """The value in req.context must be identical to the response header value."""

    def test_context_and_header_match_when_provided(self) -> None:
        """Context and header must both carry the client-supplied value."""
        store: dict = {}
        _, client = _make_app(capture_store=store)
        supplied = 'consistency-check-id'
        result = client.simulate_get('/', headers={'X-Request-ID': supplied})

        assert store['request_id'] == supplied
        assert result.headers.get('X-Request-ID') == supplied
        # Also confirm they are equal to each other (not just equal to the supplied value).
        assert store['request_id'] == result.headers.get('X-Request-ID')

    def test_context_and_header_match_when_generated(self) -> None:
        """Context and header must both carry the same auto-generated UUID-4."""
        store: dict = {}
        _, client = _make_app(capture_store=store)
        result = client.simulate_get('/')

        ctx_id = store.get('request_id')
        header_id = result.headers.get('X-Request-ID')

        assert ctx_id is not None
        assert header_id is not None
        assert ctx_id == header_id, (
            f'Context ID {ctx_id!r} and response header ID {header_id!r} must be equal'
        )


# ---------------------------------------------------------------------------
# Tests: public API / import surface
# ---------------------------------------------------------------------------


class TestPublicAPI:
    """RequestIDMiddleware must be reachable through the expected import paths."""

    def test_importable_from_falcon_package(self) -> None:
        """``falcon.RequestIDMiddleware`` must be directly accessible."""
        assert hasattr(falcon, 'RequestIDMiddleware'), (
            'RequestIDMiddleware must be exported from the falcon package'
        )
        assert falcon.RequestIDMiddleware is RequestIDMiddleware

    def test_importable_from_falcon_middleware(self) -> None:
        """``falcon.middleware.RequestIDMiddleware`` must be directly accessible."""
        from falcon.middleware import RequestIDMiddleware as _RIM
        assert _RIM is RequestIDMiddleware

    def test_in_all_tuple(self) -> None:
        """'RequestIDMiddleware' must appear in falcon.__all__."""
        assert 'RequestIDMiddleware' in falcon.__all__, (
            "'RequestIDMiddleware' must be listed in falcon.__all__"
        )

output
New file created successfully at /tmp/outputs/tests/test_request_id_middleware.py

bash
command
cd /tmp/outputs && python -m pytest tests/test_request_id_middleware.py -v 2>&1

output
============================= test session starts ==============================
platform linux -- Python 3.9.7, pytest-6.2.4, py-1.10.0, pluggy-0.13.1 -- /opt/conda/bin/python
cachedir: .pytest_cache
hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/outputs/.hypothesis/examples')
rootdir: /tmp/outputs
plugins: reportlog-0.3.0, hypothesis-6.75.3, cov-4.1.0, timeout-2.1.0, anyio-2.2.0
collecting ... collected 16 items

tests/test_request_id_middleware.py::TestProvidedRequestID::test_provided_id_is_reused PASSED [  6%]
tests/test_request_id_middleware.py::TestProvidedRequestID::test_provided_id_in_context PASSED [ 12%]
tests/test_request_id_middleware.py::TestProvidedRequestID::test_provided_id_in_response_header PASSED [ 18%]
tests/test_request_id_middleware.py::TestAutoGeneratedRequestID::test_auto_generated_id_is_uuid4 PASSED [ 25%]
tests/test_request_id_middleware.py::TestAutoGeneratedRequestID::test_auto_generated_id_in_context PASSED [ 31%]
tests/test_request_id_middleware.py::TestAutoGeneratedRequestID::test_auto_generated_id_in_response_header PASSED [ 37%]
tests/test_request_id_middleware.py::TestContextAccessibility::test_context_accessible_in_handler_provided PASSED [ 43%]
tests/test_request_id_middleware.py::TestContextAccessibility::test_context_accessible_in_handler_generated PASSED [ 50%]
tests/test_request_id_middleware.py::TestResponseHeaderAlwaysPresent::test_response_header_present_without_incoming PASSED [ 56%]
tests/test_request_id_middleware.py::TestResponseHeaderAlwaysPresent::test_response_header_present_with_incoming PASSED [ 62%]
tests/test_request_id_middleware.py::TestRequestIsolation::test_each_request_gets_independent_id PASSED [ 68%]
tests/test_request_id_middleware.py::TestContextAndHeaderConsistency::test_context_and_header_match_when_provided PASSED [ 75%]
tests/test_request_id_middleware.py::TestContextAndHeaderConsistency::test_context_and_header_match_when_generated PASSED [ 81%]
tests/test_request_id_middleware.py::TestPublicAPI::test_importable_from_falcon_package PASSED [ 87%]
tests/test_request_id_middleware.py::TestPublicAPI::test_importable_from_falcon_middleware PASSED [ 93%]
tests/test_request_id_middleware.py::TestPublicAPI::test_in_all_tuple PASSED [100%]

============================== 16 passed in 0.72s ==============================
All 16 tests pass. Let me do a final review of the output files to make sure everything is clean:
bash
command
cat /tmp/outputs/falcon/middleware.py

output
from __future__ import annotations

from collections.abc import Iterable
from typing import TYPE_CHECKING
import uuid

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


class RequestIDMiddleware:
"""Middleware that tracks a unique request ID throughout the request cycle.

For each incoming request the middleware:

1. Inspects the ``X-Request-ID`` header supplied by the client.
2. Uses that value as-is when it is present, or generates a new
:func:`uuid.uuid4` string when it is absent.
3. Stores the resolved ID on ``req.context.request_id`` so that any
downstream resource handler or hook can read it without touching
headers directly.
4. Echoes the same ID back to the caller via the ``X-Request-ID``
response header.

The middleware is compatible with both WSGI and ASGI applications.
WSGI apps use the synchronous ``process_request`` / ``process_response``
pair; ASGI apps use the ``*_async`` counterparts.  The logic is
identical in both cases: the ``*_async`` methods simply delegate to the
synchronous implementations, exactly as :class:`CORSMiddleware` does.

Example::

import falcon
from falcon.middleware import RequestIDMiddleware

app = falcon.App(middleware=[RequestIDMiddleware()])

class OrderResource:
def on_get(self, req, resp, order_id):
# The request ID is always available here.
rid = req.context.request_id
resp.media = {'order_id': order_id, 'request_id': rid}

app.add_route('/orders/{order_id}', OrderResource())

The client may pin its own correlation ID::

GET /orders/42 HTTP/1.1
X-Request-ID: my-trace-abc-123

and the same value will be reflected in the response::

HTTP/1.1 200 OK
X-Request-ID: my-trace-abc-123

When the client omits the header a fresh UUID-4 is generated and
returned::

HTTP/1.1 200 OK
X-Request-ID: 3317cc0b-1cc7-4e5b-ac28-481db88fb7df
"""

# ------------------------------------------------------------------
# WSGI interface
# ------------------------------------------------------------------

def process_request(self, req: Request, resp: Response) -> None:
"""Resolve the request ID and store it on ``req.context``.

If the client supplied an ``X-Request-ID`` header its value is used
unchanged.  Otherwise a new UUID-4 string is generated.  Either way
the resolved ID is assigned to ``req.context.request_id``.

Args:
req: The WSGI (or ASGI) request object for the current request.
resp: The WSGI (or ASGI) response object for the current request.
"""
incoming = req.get_header('X-Request-ID')
req.context.request_id = incoming if incoming is not None else str(uuid.uuid4())

def process_response(
self,
req: Request,
resp: Response,
resource: object,
req_succeeded: bool,
) -> None:
"""Copy the request ID from ``req.context`` to the response header.

The ``X-Request-ID`` response header is set to the same value that
was stored on ``req.context.request_id`` by :meth:`process_request`,
ensuring the caller can correlate the response with the originating
request regardless of whether the ID was client-supplied or
auto-generated.

Args:
req: The WSGI (or ASGI) request object for the current request.
resp: The WSGI (or ASGI) response object for the current request.
resource: The resource object to which the request was routed,
or ``None`` if routing did not succeed.
req_succeeded: ``True`` if no exception was raised while the
request was being processed, ``False`` otherwise.
"""
resp.set_header('X-Request-ID', req.context.request_id)

# ------------------------------------------------------------------
# ASGI interface (delegates to the synchronous implementations above)
# ------------------------------------------------------------------

async def process_request_async(
self, req: AsgiRequest, resp: AsgiResponse
) -> None:
"""ASGI counterpart of :meth:`process_request`."""
self.process_request(req, resp)  # type: ignore[arg-type]

async def process_response_async(
self,
req: AsgiRequest,
resp: AsgiResponse,
resource: object,
req_succeeded: bool,
) -> None:
"""ASGI counterpart of :meth:`process_response`."""
self.process_response(req, resp, resource, req_succeeded)  # type: ignore[arg-type]

bash
command
cat /tmp/outputs/tests/test_request_id_middleware.py

output
"""Tests for falcon.middleware.RequestIDMiddleware.

Coverage matrix
---------------
Each public behaviour of the middleware is exercised by at least one focused
test, and a small number of integration tests confirm that everything works
together through the full Falcon request/response pipeline.

Behaviour                                              | Test(s)
-------------------------------------------------------|------------------------------
Client supplies X-Request-ID → value is reused         | test_provided_id_is_reused,
| test_provided_id_in_context,
| test_provided_id_in_response_header
Client omits X-Request-ID → UUID-4 is auto-generated  | test_auto_generated_id_is_uuid4,
| test_auto_generated_id_in_context,
| test_auto_generated_id_in_response_header
req.context.request_id is accessible in the handler   | test_context_accessible_in_handler_provided,
| test_context_accessible_in_handler_generated
X-Request-ID response header is always present         | test_response_header_present_without_incoming,
| test_response_header_present_with_incoming
Each request gets an independent ID                    | test_each_request_gets_independent_id
Export through the top-level falcon package            | test_importable_from_falcon_package
Direct import from falcon.middleware                   | test_importable_from_falcon_middleware
"""

from __future__ import annotations

import re
import sys
import os

# Make the local source tree the primary import target so that we test the
# modified package rather than any installed copy.
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import falcon
import falcon.testing
from falcon.middleware import RequestIDMiddleware

# ---------------------------------------------------------------------------
# Helpers shared across all tests
# ---------------------------------------------------------------------------

# RFC-4122 UUID-4 canonical string representation pattern.
# Version nibble must be '4'; variant nibble must be one of 8, 9, a, b.
_UUID4_RE = re.compile(
r'^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
)


def _make_app(*, capture_store: dict | None = None) -> tuple[falcon.App, falcon.testing.TestClient]:
"""Return a minimal Falcon app that has *only* RequestIDMiddleware active.

If *capture_store* is supplied, the resource handler writes
``req.context.request_id`` into ``capture_store['request_id']`` so the
test can inspect the context value that the handler sees.
"""
app = falcon.App(middleware=[RequestIDMiddleware()])

class _Resource:
def on_get(self, req: falcon.Request, resp: falcon.Response) -> None:
if capture_store is not None:
capture_store['request_id'] = req.context.request_id
resp.media = {'ok': True}

app.add_route('/', _Resource())
return app, falcon.testing.TestClient(app)


# ---------------------------------------------------------------------------
# Tests: client-supplied X-Request-ID header
# ---------------------------------------------------------------------------


class TestProvidedRequestID:
"""The middleware must reuse the X-Request-ID value given by the client."""

SUPPLIED_ID = 'my-trace-id-abc-123'

def _result(self) -> tuple[falcon.testing.Result, dict]:
store: dict = {}
_, client = _make_app(capture_store=store)
result = client.simulate_get('/', headers={'X-Request-ID': self.SUPPLIED_ID})
return result, store

def test_provided_id_is_reused(self) -> None:
"""The client-supplied value must not be replaced by the middleware."""
result, store = self._result()
# Both the response header and the context should carry the exact same
# string the client sent — no transformation, no UUID generation.
assert store['request_id'] == self.SUPPLIED_ID

def test_provided_id_in_context(self) -> None:
"""req.context.request_id must equal the client-supplied value."""
_, store = self._result()
assert store['request_id'] == self.SUPPLIED_ID

def test_provided_id_in_response_header(self) -> None:
"""X-Request-ID response header must echo the client-supplied value."""
result, _ = self._result()
assert result.headers.get('X-Request-ID') == self.SUPPLIED_ID


# ---------------------------------------------------------------------------
# Tests: auto-generation when X-Request-ID is absent
# ---------------------------------------------------------------------------


class TestAutoGeneratedRequestID:
"""When the client omits X-Request-ID the middleware must generate a UUID-4."""

def _result(self) -> tuple[falcon.testing.Result, dict]:
store: dict = {}
_, client = _make_app(capture_store=store)
# No X-Request-ID header supplied.
result = client.simulate_get('/')
return result, store

def test_auto_generated_id_is_uuid4(self) -> None:
"""The auto-generated value must be a canonical RFC-4122 UUID-4 string."""
result, _ = self._result()
generated = result.headers.get('X-Request-ID')
assert generated is not None, 'X-Request-ID header must be present'
assert _UUID4_RE.match(generated), (
f'Expected a UUID-4 string, got: {generated!r}'
)

def test_auto_generated_id_in_context(self) -> None:
"""req.context.request_id must be set and be a valid UUID-4."""
_, store = self._result()
generated = store.get('request_id')
assert generated is not None, 'req.context.request_id must be set'
assert _UUID4_RE.match(generated), (
f'Expected a UUID-4 string in context, got: {generated!r}'
)

def test_auto_generated_id_in_response_header(self) -> None:
"""X-Request-ID response header must be present and be a valid UUID-4."""
result, _ = self._result()
header_val = result.headers.get('X-Request-ID')
assert header_val is not None, 'X-Request-ID response header must be present'
assert _UUID4_RE.match(header_val), (
f'Response header is not a UUID-4 string: {header_val!r}'
)


# ---------------------------------------------------------------------------
# Tests: req.context accessibility in resource handlers
# ---------------------------------------------------------------------------


class TestContextAccessibility:
"""req.context.request_id must be readable inside every resource handler."""

def test_context_accessible_in_handler_provided(self) -> None:
"""Handler can read req.context.request_id when the ID was client-provided."""
supplied = 'trace-from-handler-test'
store: dict = {}
_, client = _make_app(capture_store=store)
client.simulate_get('/', headers={'X-Request-ID': supplied})

# The handler must have seen the exact same value.
assert store.get('request_id') == supplied

def test_context_accessible_in_handler_generated(self) -> None:
"""Handler can read req.context.request_id when the ID was auto-generated."""
store: dict = {}
_, client = _make_app(capture_store=store)
client.simulate_get('/')

ctx_id = store.get('request_id')
assert ctx_id is not None, 'req.context.request_id must be set by the time the handler runs'
assert _UUID4_RE.match(ctx_id), (
f'Context request_id is not a UUID-4 string: {ctx_id!r}'
)


# ---------------------------------------------------------------------------
# Tests: response header always present
# ---------------------------------------------------------------------------


class TestResponseHeaderAlwaysPresent:
"""X-Request-ID must appear in every response, regardless of the request."""

def test_response_header_present_without_incoming(self) -> None:
"""X-Request-ID response header must be set even when the client omitted it."""
_, client = _make_app()
result = client.simulate_get('/')
assert 'X-Request-ID' in result.headers, (
'X-Request-ID response header must be present when no header was supplied'
)

def test_response_header_present_with_incoming(self) -> None:
"""X-Request-ID response header must be set when the client did supply it."""
_, client = _make_app()
result = client.simulate_get('/', headers={'X-Request-ID': 'present-test-id'})
assert 'X-Request-ID' in result.headers, (
'X-Request-ID response header must be present when a header was supplied'
)


# ---------------------------------------------------------------------------
# Tests: request isolation
# ---------------------------------------------------------------------------


class TestRequestIsolation:
"""Each request must receive an independent request ID."""

def test_each_request_gets_independent_id(self) -> None:
"""Two back-to-back requests without X-Request-ID must get different IDs.

This guards against any accidental shared mutable state inside the
middleware instance (e.g., a class-level ID that gets reused).
"""
_, client = _make_app()

ids: list[str] = []
for _ in range(5):
result = client.simulate_get('/')
rid = result.headers.get('X-Request-ID')
assert rid is not None
assert _UUID4_RE.match(rid), f'Not a UUID-4: {rid!r}'
ids.append(rid)

# All five IDs must be distinct.
assert len(set(ids)) == 5, (
f'Expected 5 unique request IDs but got duplicates: {ids}'
)


# ---------------------------------------------------------------------------
# Tests: context and response header values are always consistent
# ---------------------------------------------------------------------------


class TestContextAndHeaderConsistency:
"""The value in req.context must be identical to the response header value."""

def test_context_and_header_match_when_provided(self) -> None:
"""Context and header must both carry the client-supplied value."""
store: dict = {}
_, client = _make_app(capture_store=store)
supplied = 'consistency-check-id'
result = client.simulate_get('/', headers={'X-Request-ID': supplied})

assert store['request_id'] == supplied
assert result.headers.get('X-Request-ID') == supplied
# Also confirm they are equal to each other (not just equal to the supplied value).
assert store['request_id'] == result.headers.get('X-Request-ID')

def test_context_and_header_match_when_generated(self) -> None:
"""Context and header must both carry the same auto-generated UUID-4."""
store: dict = {}
_, client = _make_app(capture_store=store)
result = client.simulate_get('/')

ctx_id = store.get('request_id')
header_id = result.headers.get('X-Request-ID')

assert ctx_id is not None
assert header_id is not None
assert ctx_id == header_id, (
f'Context ID {ctx_id!r} and response header ID {header_id!r} must be equal'
)


# ---------------------------------------------------------------------------
# Tests: public API / import surface
# ---------------------------------------------------------------------------


class TestPublicAPI:
"""RequestIDMiddleware must be reachable through the expected import paths."""

def test_importable_from_falcon_package(self) -> None:
"""``falcon.RequestIDMiddleware`` must be directly accessible."""
assert hasattr(falcon, 'RequestIDMiddleware'), (
'RequestIDMiddleware must be exported from the falcon package'
)
assert falcon.RequestIDMiddleware is RequestIDMiddleware

def test_importable_from_falcon_middleware(self) -> None:
"""``falcon.middleware.RequestIDMiddleware`` must be directly accessible."""
from falcon.middleware import RequestIDMiddleware as _RIM
assert _RIM is RequestIDMiddleware

def test_in_all_tuple(self) -> None:
"""'RequestIDMiddleware' must appear in falcon.__all__."""
assert 'RequestIDMiddleware' in falcon.__all__, (
"'RequestIDMiddleware' must be listed in falcon.__all__"
)

bash
command
# Verify the two changed lines in __init__.py are exactly right and nothing else changed
diff /tmp/inputs/falcon/__init__.py /tmp/outputs/falcon/__init__.py

output
35a36
>     'RequestIDMiddleware',
416a418
> from falcon.middleware import RequestIDMiddleware

bash
command
# Verify middleware.py changes: only import uuid added at the top, class appended at the bottom
diff /tmp/inputs/falcon/middleware.py /tmp/outputs/falcon/middleware.py

output
4a5
> import uuid
173a175,290
>
>
> class RequestIDMiddleware:
>     """Middleware that tracks a unique request ID throughout the request cycle.
>
>     For each incoming request the middleware:
>
>     1. Inspects the ``X-Request-ID`` header supplied by the client.
>     2. Uses that value as-is when it is present, or generates a new
>        :func:`uuid.uuid4` string when it is absent.
>     3. Stores the resolved ID on ``req.context.request_id`` so that any
>        downstream resource handler or hook can read it without touching
>        headers directly.
>     4. Echoes the same ID back to the caller via the ``X-Request-ID``
>        response header.
>
>     The middleware is compatible with both WSGI and ASGI applications.
>     WSGI apps use the synchronous ``process_request`` / ``process_response``
>     pair; ASGI apps use the ``*_async`` counterparts.  The logic is
>     identical in both cases: the ``*_async`` methods simply delegate to the
>     synchronous implementations, exactly as :class:`CORSMiddleware` does.
>
>     Example::
>
>         import falcon
>         from falcon.middleware import RequestIDMiddleware
>
>         app = falcon.App(middleware=[RequestIDMiddleware()])
>
>         class OrderResource:
>             def on_get(self, req, resp, order_id):
>                 # The request ID is always available here.
>                 rid = req.context.request_id
>                 resp.media = {'order_id': order_id, 'request_id': rid}
>
>         app.add_route('/orders/{order_id}', OrderResource())
>
>     The client may pin its own correlation ID::
>
>         GET /orders/42 HTTP/1.1
>         X-Request-ID: my-trace-abc-123
>
>     and the same value will be reflected in the response::
>
>         HTTP/1.1 200 OK
>         X-Request-ID: my-trace-abc-123
>
>     When the client omits the header a fresh UUID-4 is generated and
>     returned::
>
>         HTTP/1.1 200 OK
>         X-Request-ID: 3317cc0b-1cc7-4e5b-ac28-481db88fb7df
>     """
>
>     # ------------------------------------------------------------------
>     # WSGI interface
>     # ------------------------------------------------------------------
>
>     def process_request(self, req: Request, resp: Response) -> None:
>         """Resolve the request ID and store it on ``req.context``.
>
>         If the client supplied an ``X-Request-ID`` header its value is used
>         unchanged.  Otherwise a new UUID-4 string is generated.  Either way
>         the resolved ID is assigned to ``req.context.request_id``.
>
>         Args:
>             req: The WSGI (or ASGI) request object for the current request.
>             resp: The WSGI (or ASGI) response object for the current request.
>         """
>         incoming = req.get_header('X-Request-ID')
>         req.context.request_id = incoming if incoming is not None else str(uuid.uuid4())
>
>     def process_response(
>         self,
>         req: Request,
>         resp: Response,
>         resource: object,
>         req_succeeded: bool,
>     ) -> None:
>         """Copy the request ID from ``req.context`` to the response header.
>
>         The ``X-Request-ID`` response header is set to the same value that
>         was stored on ``req.context.request_id`` by :meth:`process_request`,
>         ensuring the caller can correlate the response with the originating
>         request regardless of whether the ID was client-supplied or
>         auto-generated.
>
>         Args:
>             req: The WSGI (or ASGI) request object for the current request.
>             resp: The WSGI (or ASGI) response object for the current request.
>             resource: The resource object to which the request was routed,
>                 or ``None`` if routing did not succeed.
>             req_succeeded: ``True`` if no exception was raised while the
>                 request was being processed, ``False`` otherwise.
>         """
>         resp.set_header('X-Request-ID', req.context.request_id)
>
>     # ------------------------------------------------------------------
>     # ASGI interface (delegates to the synchronous implementations above)
>     # ------------------------------------------------------------------
>
>     async def process_request_async(
>         self, req: AsgiRequest, resp: AsgiResponse
>     ) -> None:
>         """ASGI counterpart of :meth:`process_request`."""
>         self.process_request(req, resp)  # type: ignore[arg-type]
>
>     async def process_response_async(
>         self,
>         req: AsgiRequest,
>         resp: AsgiResponse,
>         resource: object,
>         req_succeeded: bool,
>     ) -> None:
>         """ASGI counterpart of :meth:`process_response`."""
>         self.process_response(req, resp, resource, req_succeeded)  # type: ignore[arg-type]

bash
command
# Confirm no other files in the package were touched
diff -rq --exclude='*.pyc' /tmp/inputs/falcon /tmp/outputs/falcon

output
Files /tmp/inputs/falcon/__init__.py and /tmp/outputs/falcon/__init__.py differ
Only in /tmp/outputs/falcon: __pycache__
Only in /tmp/outputs/falcon/asgi: __pycache__
Only in /tmp/outputs/falcon/cyutil: __pycache__
Only in /tmp/outputs/falcon/media: __pycache__
Files /tmp/inputs/falcon/middleware.py and /tmp/outputs/falcon/middleware.py differ
Only in /tmp/outputs/falcon/routing: __pycache__
Only in /tmp/outputs/falcon/testing: __pycache__
Only in /tmp/outputs/falcon/util: __pycache__
Exactly the two expected files changed (plus `__pycache__` from running pytest). One final clean run to confirm:
bash
command
cd /tmp/outputs && python -m pytest tests/test_request_id_middleware.py -v 2>&1

output
============================= test session starts ==============================
platform linux -- Python 3.9.7, pytest-6.2.4, py-1.10.0, pluggy-0.13.1 -- /opt/conda/bin/python
cachedir: .pytest_cache
hypothesis profile 'default' -> database=DirectoryBasedExampleDatabase('/tmp/outputs/.hypothesis/examples')
rootdir: /tmp/outputs
plugins: reportlog-0.3.0, hypothesis-6.75.3, cov-4.1.0, timeout-2.1.0, anyio-2.2.0
collecting ... collected 16 items

tests/test_request_id_middleware.py::TestProvidedRequestID::test_provided_id_is_reused PASSED [  6%]
tests/test_request_id_middleware.py::TestProvidedRequestID::test_provided_id_in_context PASSED [ 12%]
tests/test_request_id_middleware.py::TestProvidedRequestID::test_provided_id_in_response_header PASSED [ 18%]
tests/test_request_id_middleware.py::TestAutoGeneratedRequestID::test_auto_generated_id_is_uuid4 PASSED [ 25%]
tests/test_request_id_middleware.py::TestAutoGeneratedRequestID::test_auto_generated_id_in_context PASSED [ 31%]
tests/test_request_id_middleware.py::TestAutoGeneratedRequestID::test_auto_generated_id_in_response_header PASSED [ 37%]
tests/test_request_id_middleware.py::TestContextAccessibility::test_context_accessible_in_handler_provided PASSED [ 43%]
tests/test_request_id_middleware.py::TestContextAccessibility::test_context_accessible_in_handler_generated PASSED [ 50%]
tests/test_request_id_middleware.py::TestResponseHeaderAlwaysPresent::test_response_header_present_without_incoming PASSED [ 56%]
tests/test_request_id_middleware.py::TestResponseHeaderAlwaysPresent::test_response_header_present_with_incoming PASSED [ 62%]
tests/test_request_id_middleware.py::TestRequestIsolation::test_each_request_gets_independent_id PASSED [ 68%]
tests/test_request_id_middleware.py::TestContextAndHeaderConsistency::test_context_and_header_match_when_provided PASSED [ 75%]
tests/test_request_id_middleware.py::TestContextAndHeaderConsistency::test_context_and_header_match_when_generated PASSED [ 81%]
tests/test_request_id_middleware.py::TestPublicAPI::test_importable_from_falcon_package PASSED [ 87%]
tests/test_request_id_middleware.py::TestPublicAPI::test_importable_from_falcon_middleware PASSED [ 93%]
tests/test_request_id_middleware.py::TestPublicAPI::test_in_all_tuple PASSED [100%]

============================== 16 passed in 0.43s ==============================
16/16. Let me do a final check of the output file tree to confirm the deliverables are clean:
str_replace_based_edit_tool
command
view
path
/tmp/outputs

output
2.0M	/tmp/outputs
2.0M	/tmp/outputs/falcon
22K	/tmp/outputs/falcon/__init__.py
352K	/tmp/outputs/falcon/__pycache__
12K	/tmp/outputs/falcon/_typing.py
56K	/tmp/outputs/falcon/app.py
16K	/tmp/outputs/falcon/app_helpers.py
320K	/tmp/outputs/falcon/asgi
2.5K	/tmp/outputs/falcon/asgi_spec.py
76K	/tmp/outputs/falcon/bench
4.5K	/tmp/outputs/falcon/cmd
6.5K	/tmp/outputs/falcon/constants.py
32K	/tmp/outputs/falcon/cyutil
106K	/tmp/outputs/falcon/errors.py
6.5K	/tmp/outputs/falcon/forwarded.py
15K	/tmp/outputs/falcon/hooks.py
9.0K	/tmp/outputs/falcon/http_error.py
2.5K	/tmp/outputs/falcon/http_status.py
28K	/tmp/outputs/falcon/inspect.py
115K	/tmp/outputs/falcon/media
12K	/tmp/outputs/falcon/middleware.py
0	/tmp/outputs/falcon/py.typed
5.5K	/tmp/outputs/falcon/redirects.py
93K	/tmp/outputs/falcon/request.py
6.5K	/tmp/outputs/falcon/request_helpers.py
4.0K	/tmp/outputs/falcon/responders.py
56K	/tmp/outputs/falcon/response.py
5.0K	/tmp/outputs/falcon/response_helpers.py
128K	/tmp/outputs/falcon/routing
13K	/tmp/outputs/falcon/status_codes.py
6.0K	/tmp/outputs/falcon/stream.py
324K	/tmp/outputs/falcon/testing
2.0K	/tmp/outputs/falcon/typing.py
1.0K	/tmp/outputs/falcon/uri.py
172K	/tmp/outputs/falcon/util
1.0K	/tmp/outputs/falcon/version.py
32K	/tmp/outputs/tests
20K	/tmp/outputs/tests/__pycache__
13K	/tmp/outputs/tests/test_request_id_middleware.py
16/16 tests passing. Here is a precise account of every decision made.

---

## What was done and why

### Exploration before writing anything

Before touching a single file, the entire codebase was read carefully:

- **`middleware.py`** – studied `CORSMiddleware` end-to-end: it holds no mutable per-request state, uses `process_response` for its single hook, and provides an `async process_response_async` that simply calls the sync version.
- **`_typing.py`** – read all the `Protocol` definitions, especially `UniversalMiddlewareWithProcessRequest` and `UniversalMiddlewareWithProcessResponse`, to understand what the "universal" pattern means: providing both a sync method *and* an `*_async`-suffixed coroutine lets the same object work under both WSGI and ASGI.
- **`app_helpers.py` (`prepare_middleware`)** – traced exactly how Falcon finds hooks: for an ASGI app it looks up `process_request_async` first, falling back to a wrapped `process_request`; for WSGI it calls the sync methods directly. This confirmed that having all four methods (`process_request`, `process_request_async`, `process_response`, `process_response_async`) on the same class is the correct universal pattern.
- **`request.py` (`get_header`)** – traced how the WSGI env key is formed: the header name is uppercased and dashes replaced by underscores to get `HTTP_X_REQUEST_ID`. Verified with a live probe that `req.get_header('X-Request-ID')` correctly retrieves the value from a simulated request.
- **`asgi/request.py` (`get_header`)** – confirmed the ASGI version caches the lowercased bytes-form of the header name and does the same lookup, so the identical call works in both stacks.
- **`response.py` (`set_header`)** – confirmed `resp.set_header(name, value)` lowercases the name internally and stores it in `_headers`; `result.headers` in tests wraps that dict through `CaseInsensitiveDict`, so `result.headers.get('X-Request-ID')` returns the value regardless of casing.
- **`util/structures.py` (`Context`)** – confirmed that attribute assignment on `req.context` (e.g. `req.context.request_id = …`) is the idiomatic, documented pattern and is always accessible downstream.
- **`testing/client.py` and `testing/test_case.py`** – confirmed how `TestClient.simulate_get` is called, how response headers are surfaced on `Result.headers`, and that passing a `headers=` dict sets those headers on the simulated incoming request.
- **`__init__.py`** – noted the exact two-part pattern for public exports: add the name string to `__all__` and add an explicit `from falcon.middleware import …` import line at the right alphabetical location.

Live probes were run for every non-obvious assumption before writing production code: that `req.get_header` finds the header, that `resp.set_header` round-trips through `result.headers`, that `req.context` attribute assignment is visible in the handler, that the four-method universal pattern works in WSGI, and that `uuid.uuid4()` always produces strings that match the RFC-4122 UUID-4 regex.

---

### `falcon/middleware.py`

**`import uuid`** added at the top alongside the existing standard-library imports — nothing else in the existing imports section changed.

**`RequestIDMiddleware` class** appended after `CORSMiddleware`. It deliberately has no `__init__` and no instance attributes, because there is no configuration to hold and no per-request shared state. Every piece of data the middleware touches lives on the per-request `req.context` object.

**`process_request`** is the single decision point. It calls `req.get_header('X-Request-ID')` which returns `None` when the header is absent. The ternary expression `incoming if incoming is not None else str(uuid.uuid4())` uses the explicit `is not None` check (rather than truthiness) because an empty string from a client, while unusual, should pass through as-is and not be silently replaced with a generated UUID. The resolved value is written to `req.context.request_id` so downstream handlers never need to touch the header API — they just read an attribute.

**`process_response`** is unconditional. It calls `resp.set_header('X-Request-ID', req.context.request_id)`. No conditional logic is needed: `process_request` always writes the attribute, so it is always readable here. The `resource` and `req_succeeded` parameters are accepted with the correct signature (matching `CORSMiddleware`) but not used, because the ID must be echoed back on every response, including error responses.

**`process_request_async` and `process_response_async`** are `async def` coroutines that immediately delegate to the sync methods, with `# type: ignore[arg-type]` to suppress the expected WSGI/ASGI type mismatch that `CORSMiddleware` handles identically. This is precisely the "universal middleware" pattern that `app_helpers.prepare_middleware` is designed to detect: for WSGI, the sync methods are called directly; for ASGI, the `*_async` methods are called.

---

### `falcon/__init__.py`

Two surgical additions, nothing else:

- `'RequestIDMiddleware'` inserted into `__all__` immediately after `'CORSMiddleware'` to preserve the alphabetical/logical grouping.
- `from falcon.middleware import RequestIDMiddleware` inserted on the line immediately after the `CORSMiddleware` import for the same reason.

---

### `tests/test_request_id_middleware.py`

The test file opens with a coverage matrix comment table that maps every observable behaviour to the test(s) that cover it. Tests are grouped into seven focused classes.

**`_UUID4_RE`** is a compiled regex that checks all structural properties of an RFC-4122 UUID-4 string: the exact lengths of each group, the version nibble (`4`), and the variant nibble (`8`, `9`, `a`, or `b`). This was validated against 10,000 generated UUIDs before being used in any assertion.

**`_make_app`** is the shared factory. It creates a fresh `falcon.App` with only `RequestIDMiddleware`, adds a minimal `GET /` resource, and optionally wires a `capture_store` dict through a closure so individual tests can inspect the value `req.context.request_id` held by the time the handler runs — without coupling any test to a global.

**`TestProvidedRequestID`** covers all three observable facts when a client supplies the header: the context holds the supplied value, and the response header echoes it back unchanged. Three separate tests are used because "value is reused", "value is in context", and "value is in response header" are three distinct propagation steps that could each break independently.

**`TestAutoGeneratedRequestID`** mirrors the same three-fact structure for the auto-generation path, and each assertion checks both presence (`is not None`) and format (`_UUID4_RE.match`) so a failure message is maximally informative.

**`TestContextAccessibility`** confirms that `req.context.request_id` is visible inside the actual resource handler in both the client-provided and auto-generated cases. This is important because middleware sets it in `process_request`, and the handler runs later — if the attribute were somehow scoped incorrectly, these tests would catch it.

**`TestResponseHeaderAlwaysPresent`** checks the minimum guarantee: `X-Request-ID` appears in the response headers on every request, whether or not the client sent one. This exercises the fact that `process_response` is unconditional.

**`TestRequestIsolation`** makes five consecutive requests without any `X-Request-ID` header and asserts that all five response header values are distinct. This guards against a subtle bug where a middleware instance accidentally stores a generated ID as instance state and reuses it.

**`TestContextAndHeaderConsistency`** asserts a triangle: for both the provided and generated paths, `ctx.request_id == supplied_value`, `response_header == supplied_value`, *and* `ctx.request_id == response_header`. The third assertion is the one that would fail if `process_response` somehow used a different value than the one `process_request` stored.

**`TestPublicAPI`** verifies all three entry points into the public API: `falcon.RequestIDMiddleware`, `falcon.middleware.RequestIDMiddleware`, and the presence of the string `'RequestIDMiddleware'` in `falcon.__all__`.