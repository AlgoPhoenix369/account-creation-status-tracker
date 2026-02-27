bash
command
cat /tmp/inputs/falcon/middleware.py

output
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

bash
command
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
python3 -c "import logging; help(logging.LoggerAdapter)" 2>&1 | head -60

output
Help on class LoggerAdapter in module logging:

class LoggerAdapter(builtins.object)
|  LoggerAdapter(logger, extra)
|
|  An adapter for loggers which makes it easier to specify contextual
|  information in logging output.
|
|  Methods defined here:
|
|  __init__(self, logger, extra)
|      Initialize the adapter with a logger and a dict-like object which
|      provides contextual information. This constructor signature allows
|      easy stacking of LoggerAdapters, if so desired.
|
|      You can effectively pass keyword arguments as shown in the
|      following example:
|
|      adapter = LoggerAdapter(someLogger, dict(p1=v1, p2="v2"))
|
|  __repr__(self)
|      Return repr(self).
|
|  critical(self, msg, *args, **kwargs)
|      Delegate a critical call to the underlying logger.
|
|  debug(self, msg, *args, **kwargs)
|      Delegate a debug call to the underlying logger.
|
|  error(self, msg, *args, **kwargs)
|      Delegate an error call to the underlying logger.
|
|  exception(self, msg, *args, exc_info=True, **kwargs)
|      Delegate an exception call to the underlying logger.
|
|  getEffectiveLevel(self)
|      Get the effective level for the underlying logger.
|
|  hasHandlers(self)
|      See if the underlying logger has any handlers.
|
|  info(self, msg, *args, **kwargs)
|      Delegate an info call to the underlying logger.
|
|  isEnabledFor(self, level)
|      Is this logger enabled for level 'level'?
|
|  log(self, level, msg, *args, **kwargs)
|      Delegate a log call to the underlying logger, after adding
|      contextual information from this adapter instance.
|
|  process(self, msg, kwargs)
|      Process the logging message and keyword arguments passed in to
|      a logging call to insert contextual information. You can either
|      manipulate the message itself, the keyword args or both. Return
|      the message and kwargs modified (or not) to suit your needs.
|
|      Normally, you'll only need to override this one method in a
|      LoggerAdapter subclass for your specific needs.
|  

bash
command
# Understand LoggerAdapter.process() signature and how 'extra' merging works
python3 -c "
import logging
import inspect
print(inspect.getsource(logging.LoggerAdapter.process))
print()
print(inspect.getsource(logging.LoggerAdapter.__init__))
"

output
    def process(self, msg, kwargs):
"""
Process the logging message and keyword arguments passed in to
a logging call to insert contextual information. You can either
manipulate the message itself, the keyword args or both. Return
the message and kwargs modified (or not) to suit your needs.

Normally, you'll only need to override this one method in a
LoggerAdapter subclass for your specific needs.
"""
kwargs["extra"] = self.extra
return msg, kwargs


def __init__(self, logger, extra):
"""
Initialize the adapter with a logger and a dict-like object which
provides contextual information. This constructor signature allows
easy stacking of LoggerAdapters, if so desired.

You can effectively pass keyword arguments as shown in the
following example:

adapter = LoggerAdapter(someLogger, dict(p1=v1, p2="v2"))
"""
self.logger = logger
self.extra = extra

bash
command
# Understand exactly what ends up in a LogRecord when extra is used
python3 -c "
import logging

class CapturingHandler(logging.Handler):
    def __init__(self):
        super().__init__()
        self.records = []
    def emit(self, record):
        self.records.append(record)

logger = logging.getLogger('test_extra')
handler = CapturingHandler()
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

adapter = logging.LoggerAdapter(logger, {'request_id': 'abc-123'})
adapter.info('hello world')

rec = handler.records[0]
print('record.__dict__:', rec.__dict__)
print()
print('record.request_id:', rec.request_id)
print('record.getMessage():', rec.getMessage())
"

output
record.__dict__: {'name': 'test_extra', 'msg': 'hello world', 'args': (), 'levelname': 'INFO', 'levelno': 20, 'pathname': '<string>', 'filename': '<string>', 'module': '<string>', 'exc_info': None, 'exc_text': None, 'stack_info': None, 'lineno': 17, 'funcName': '<module>', 'created': 1772234489.1208413, 'msecs': 120.84126472473145, 'relativeCreated': 2.2764205932617188, 'thread': 139608717873984, 'threadName': 'MainThread', 'processName': 'MainProcess', 'process': 1142, 'request_id': 'abc-123'}

record.request_id: abc-123
record.getMessage(): hello world

bash
command
# Verify the default process() replaces the whole 'extra' key rather than merging,
# meaning if a caller passes their own 'extra' kwargs it gets clobbered.
# We need to understand this so we write process() correctly.
python3 -c "
import logging

class CapturingHandler(logging.Handler):
    def __init__(self):
        super().__init__()
        self.records = []
    def emit(self, record):
        self.records.append(record)

logger = logging.getLogger('test_merge')
handler = CapturingHandler()
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

# Default adapter: process() does kwargs['extra'] = self.extra
# If caller ALSO passes extra={...}, the default wipes it out.
adapter = logging.LoggerAdapter(logger, {'request_id': 'abc-123'})
adapter.info('with caller extra', extra={'caller_key': 'caller_val'})

rec = handler.records[0]
print('Has request_id:', hasattr(rec, 'request_id'))
print('Has caller_key:', hasattr(rec, 'caller_key'))
# Default process() stomps caller extra -- confirm this
"

output
Has request_id: True
Has caller_key: False

bash
command
# Now verify the correct merging approach: merge caller extra WITH self.extra
python3 -c "
import logging

class MergingAdapter(logging.LoggerAdapter):
    def process(self, msg, kwargs):
        merged = {**self.extra, **kwargs.get('extra', {})}
        kwargs['extra'] = merged
        return msg, kwargs

class CapturingHandler(logging.Handler):
    def __init__(self):
        super().__init__()
        self.records = []
    def emit(self, record):
        self.records.append(record)

logger = logging.getLogger('test_merge2')
handler = CapturingHandler()
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

adapter = MergingAdapter(logger, {'request_id': 'abc-123'})

# Case 1: no caller extra -> request_id still present
adapter.info('no caller extra')
rec = handler.records[0]
print('Case 1 - request_id:', rec.request_id)
print('Case 1 - has other_key:', hasattr(rec, 'other_key'))

# Case 2: caller passes their own extra
adapter.info('with caller extra', extra={'other_key': 'other_val'})
rec = handler.records[1]
print('Case 2 - request_id:', rec.request_id)
print('Case 2 - other_key:', rec.other_key)
"

output
Case 1 - request_id: abc-123
Case 1 - has other_key: False
Case 2 - request_id: abc-123
Case 2 - other_key: other_val

bash
command
# Confirm that adapter.extra is the dict passed at construction time --
# we'll pass {'request_id': <the resolved id>} so we know exactly what's in it.
python3 -c "
import logging

class CapturingHandler(logging.Handler):
    def __init__(self):
        super().__init__()
        self.records = []
    def emit(self, record):
        self.records.append(record)

logger = logging.getLogger('adapter_extra_check')
handler = CapturingHandler()
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

# Simulate what RequestIDLoggerAdapter will do
class RequestIDLoggerAdapter(logging.LoggerAdapter):
    def process(self, msg, kwargs):
        merged = {**self.extra, **kwargs.get('extra', {})}
        kwargs['extra'] = merged
        return msg, kwargs

adapter = RequestIDLoggerAdapter(logger, {'request_id': 'req-abc-456'})
adapter.debug('processing started')

rec = handler.records[0]
print('adapter.extra:', adapter.extra)
print('record.request_id:', rec.request_id)
print('record.levelname:', rec.levelname)
"

output
adapter.extra: {'request_id': 'req-abc-456'}
record.request_id: req-abc-456
record.levelname: DEBUG

bash
command
# Check how LoggerAdapter.__init__ is called -- confirm the exact signature
# we need to match so our subclass __init__ is correct
python3 -c "
import logging, inspect
sig = inspect.signature(logging.LoggerAdapter.__init__)
print('LoggerAdapter.__init__ params:', list(sig.parameters.keys()))

# Also check Python version -- on 3.12+ there is a merge_extra kwarg
import sys
print('Python:', sys.version_info)
# On 3.9 (our env) there is no merge_extra, so we must implement process() ourselves
"

output
LoggerAdapter.__init__ params: ['self', 'logger', 'extra']
Python: sys.version_info(major=3, minor=9, micro=7, releaselevel='final', serial=0)

bash
command
# Confirm the exact attribute name on context for the adapter --
# 'logger_adapter' -- make sure it doesn't conflict with anything already on Context
python3 -c "
import sys; sys.path.insert(0, '/tmp/inputs')
from falcon.util.structures import Context
ctx = Context()
print('Context attrs before:', dir(ctx))
print('Has logger_adapter:', hasattr(ctx, 'logger_adapter'))
print('Has request_id:', hasattr(ctx, 'request_id'))
"

output
Context attrs before: ['__class__', '__contains__', '__delattr__', '__delitem__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'clear', 'copy', 'get', 'items', 'keys', 'pop', 'popitem', 'setdefault', 'update', 'values']
Has logger_adapter: False
Has request_id: False

bash
command
# Look at existing imports in __init__.py to understand what we might export --
# RequestIDLoggerAdapter needs to go in __all__ and have a corresponding import
grep -n "LoggerAdapter\|logging" /tmp/inputs/falcon/__init__.py | head -20

output
26:import logging as _logging
653:_logger = _logging.getLogger('falcon')
658:#   sys.stderr in the absence of logging configuration".
662:#   so the revised choice is NOT to prevent last resort logging to sys.stderr.

bash
command
# Look at the block in __init__.py around the CORSMiddleware / RequestIDMiddleware
# imports to understand exact placement style
grep -n "CORSMiddleware\|RequestIDMiddleware\|from falcon.middleware" /tmp/inputs/falcon/__init__.py

output
35:    'CORSMiddleware',
36:    'RequestIDMiddleware',
417:from falcon.middleware import CORSMiddleware
418:from falcon.middleware import RequestIDMiddleware

bash
command
# Inspect the __all__ tuple around lines 34-40 to see exact structure/indentation
sed -n '30,45p' /tmp/inputs/falcon/__init__.py

output
    'API',
'App',
'after',
'before',
'BoundedStream',
'CORSMiddleware',
'RequestIDMiddleware',
'HTTPError',
'HTTPStatus',
'HTTPFound',
'HTTPMovedPermanently',
'HTTPPermanentRedirect',
'HTTPSeeOther',
'HTTPTemporaryRedirect',
'Forwarded',
'Request',

bash
command
# Look at lines around the middleware imports to see the exact ordering / style
sed -n '413,425p' /tmp/inputs/falcon/__init__.py

output
from falcon.hooks import after
from falcon.hooks import before
from falcon.http_error import HTTPError
from falcon.http_status import HTTPStatus
from falcon.middleware import CORSMiddleware
from falcon.middleware import RequestIDMiddleware
from falcon.redirects import HTTPFound
from falcon.redirects import HTTPMovedPermanently
from falcon.redirects import HTTPPermanentRedirect
from falcon.redirects import HTTPSeeOther
from falcon.redirects import HTTPTemporaryRedirect
from falcon.request import Forwarded
from falcon.request import Request

bash
command
# Check what typing imports are already present in middleware.py -- don't duplicate
head -15 /tmp/inputs/falcon/middleware.py

output
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

bash
command
# Check existing test file imports, fixtures, and class structure -- know exactly
# where to add TestLoggerIntegration without disturbing anything
head -40 /tmp/inputs/test/test_request_id_middleware.py

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

bash
command
# Understand the exact shape tests use when they need inline resources --
# vs using _create_app helper -- note which tests do it inline vs using the helper
grep -n "class.*Resource\|_create_app\|def test_" /tmp/inputs/test/test_request_id_middleware.py | head -50

output
43:class _RecordingResource:
59:class _RecordingResourceAsync:
73:def _create_app(asgi, middleware=None, resource=None):
108:def test_middleware_is_exported_from_falcon():
120:def test_uses_client_supplied_request_id(asgi):
122:    client, resource = _create_app(asgi)
139:def test_client_supplied_id_is_case_insensitive(asgi):
141:    client, resource = _create_app(asgi)
151:def test_client_supplied_id_is_not_overwritten(asgi):
153:    client, resource = _create_app(asgi)
173:def test_generates_request_id_when_not_provided(asgi):
175:    client, resource = _create_app(asgi)
193:def test_generated_ids_are_unique_across_requests(asgi):
195:    client, _ = _create_app(asgi)
210:def test_empty_header_triggers_generation(asgi):
212:    client, resource = _create_app(asgi)
233:def test_request_id_available_on_context_attribute(asgi):
235:    client, resource = _create_app(asgi)
249:def test_request_id_available_before_responder_runs(asgi):
251:    client, resource = _create_app(asgi)
267:def test_response_header_is_set_when_client_supplied(asgi):
268:    client, _ = _create_app(asgi)
275:def test_response_header_is_set_when_auto_generated(asgi):
276:    client, _ = _create_app(asgi)
283:def test_response_header_is_set_for_unrouted_requests(asgi):
285:    client, _ = _create_app(asgi)
293:def test_response_header_is_set_for_unrouted_requests_client_supplied(asgi):
295:    client, _ = _create_app(asgi)
305:def test_response_header_is_set_on_error(asgi):
309:        class FailingResource:
313:        class FailingResource:
332:def test_response_header_not_overridden_if_already_set(asgi):
336:        class OverridingResource:
341:        class OverridingResource:
365:def test_custom_header_name(asgi):
369:    client, resource = _create_app(asgi, middleware=[mw])
381:def test_custom_context_attr(asgi):
385:        class CustomAttrResource:
392:        class CustomAttrResource:
417:def test_custom_id_generator(asgi):
426:    client, resource = _create_app(asgi, middleware=[mw])

bash
command
# Understand exactly how existing inline-resource tests build the app
# (no helper, direct falcon.App/asgi.App construction) -- lines 305-362
sed -n '305,363p' /tmp/inputs/test/test_request_id_middleware.py

output
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

bash
command
# Now check the custom_context_attr test -- uses class-level captured attr pattern
# we need for logger_adapter tests
sed -n '381,444p' /tmp/inputs/test/test_request_id_middleware.py

output
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
# Install ruff if not present
pip install ruff --quiet 2>&1 | tail -3

output
WARNING: Retrying (Retry(total=0, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ConnectTimeoutError(<pip._vendor.urllib3.connection.HTTPConnection object at 0x7edbd9686fa0>, 'Connection to 21.0.1.51 timed out. (connect timeout=15)')': http://sandboxing-pip-server/simple/ruff/
ERROR: Could not find a version that satisfies the requirement ruff (from versions: none)
ERROR: No matching distribution found for ruff

bash
command
which ruff 2>/dev/null || find / -name "ruff" -type f 2>/dev/null | grep -v proc | head -5

system
Tool ran without output or errors

bash
command
# ruff is not available -- identify what formatters ARE available
which black pycodestyle autopep8 isort flake8 pyflakes 2>/dev/null
python3 -m black --version 2>/dev/null
python3 -m pycodestyle --version 2>/dev/null
python3 -m flake8 --version 2>/dev/null

output
/opt/conda/bin//black
/opt/conda/bin//pycodestyle
/opt/conda/bin//autopep8
/opt/conda/bin//isort
/opt/conda/bin//flake8
/opt/conda/bin//pyflakes
python -m black, version 19.10b0
2.7.0
3.9.2 (mccabe: 0.6.1, pycodestyle: 2.7.0, pyflakes: 2.3.1) CPython 3.9.7 on
Linux

bash
command
# Run existing style tools against the current middleware.py to understand
# what the baseline style checks say before we touch anything
cd /tmp/inputs && python3 -m flake8 falcon/middleware.py --max-line-length=99
echo "exit: $?"

output
exit: 0

bash
command
cd /tmp/inputs && python3 -m flake8 test/test_request_id_middleware.py --max-line-length=99
echo "exit: $?"

output
exit: 0

bash
command
cd /tmp/inputs && python3 -m pycodestyle falcon/middleware.py --max-line-length=99
echo "exit: $?"

output
exit: 0

bash
command
cd /tmp/inputs && python3 -m pycodestyle test/test_request_id_middleware.py --max-line-length=99
echo "exit: $?"

output
exit: 0

bash
command
# Check the exact line-length limit used in the existing source files
# by looking for any setup.cfg / tox.ini / pyproject.toml near the project root
find /tmp/inputs -name "setup.cfg" -o -name "tox.ini" -o -name "pyproject.toml" -o -name ".flake8" 2>/dev/null

output
/tmp/inputs/falcon/bench/nuts/setup.cfg

bash
command
# Measure actual max line length in existing middleware.py to calibrate
awk '{ print length, $0 }' /tmp/inputs/falcon/middleware.py | sort -rn | head -5

output
99             https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
90             https://wicg.github.io/private-network-access/#private-network-request-heading
87         responder instances added to the routes. When providing a custom ``on_options``
87                     'The wildcard string "*" may only be passed to allow_origins as a '
86                     'The wildcard string "*" may only be passed to allow_credentials '

bash
command
# Look at every existing NOTE comment style in middleware.py to match exactly
grep "# NOTE" /tmp/inputs/falcon/middleware.py

output
            # NOTE(kgriffs): This is a CORS preflight request. Patch the
# NOTE(falcon): The X-Request-ID header is a widely-adopted de facto
# NOTE(falcon): uuid4() provides a random UUID which is ideal
# NOTE(falcon): Treat both missing headers and empty header
# NOTE(falcon): Use the mapping interface of Context so that a
# NOTE(falcon): process_request() is expected to have populated

bash
command
# Check exact NOTE style in the test file
grep "# NOTE" /tmp/inputs/test/test_request_id_middleware.py

output
        # NOTE: The middleware is expected to have populated the request
# NOTE(tests): Parametrize every test across both app flavours so that a
# NOTE: Send a value that clearly is *not* a UUID so we can distinguish

bash
command
# Check the existing docstring style for the class and keyword args section exactly
sed -n '165,210p' /tmp/inputs/falcon/middleware.py

output
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

bash
command
sed -n '210,250p' /tmp/inputs/falcon/middleware.py

output
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

bash
command
sed -n '250,315p' /tmp/inputs/falcon/middleware.py

output
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
Now I have read everything I need. I know exactly what to change and where. Let me implement both files:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/falcon/middleware.py
old_str
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
new_str
from __future__ import annotations

from collections.abc import Iterable
import logging
from typing import Callable, Optional, TYPE_CHECKING
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
Now add the `RequestIDLoggerAdapter` class immediately before `RequestIDMiddleware`, then update the middleware class:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/falcon/middleware.py
old_str
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
new_str
class RequestIDLoggerAdapter(logging.LoggerAdapter):
    """A :class:`logging.LoggerAdapter` that injects the request ID into log records.

    Every log record emitted through this adapter will carry a ``request_id``
    field on the :class:`~logging.LogRecord`, making it straightforward to
    include the ID in formatter strings or structured-logging pipelines::

        # In a log format string:
        '%(levelname)s [%(request_id)s] %(message)s'

    Instances are created automatically by :class:`RequestIDMiddleware` when a
    logger is configured, and stored on ``req.context.logger_adapter`` for the
    lifetime of each request.  Resource handlers retrieve the adapter from the
    context rather than constructing it themselves::

        class OrdersResource:
            def on_get(self, req, resp):
                log = req.context.logger_adapter
                log.info('Fetching orders')
                # Every record emitted by `log` contains request_id.

    The adapter's :meth:`process` method merges any ``extra`` dict supplied by
    the caller at the call site with the adapter's own ``extra`` dict (which
    always contains ``request_id``).  The caller-supplied keys take precedence
    so that per-call context can extend rather than replace the adapter's base
    context.
    """

    def process(self, msg: str, kwargs: dict) -> tuple[str, dict]:
        """Merge the request ID with any per-call extra fields.

        The adapter's ``extra`` dict (containing ``request_id``) is merged
        with any ``extra`` dict supplied by the caller.  Caller-supplied keys
        win on collision so that handlers can enrich individual records without
        losing the request ID.
        """
        # NOTE(falcon): {**self.extra, **caller_extra} gives caller keys
        #   priority.  This differs from the stdlib default, which silently
        #   drops caller extra entirely.
        merged = {**self.extra, **kwargs.get('extra', {})}
        kwargs['extra'] = merged
        return msg, kwargs


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
    * When *logger* is provided, create a :class:`RequestIDLoggerAdapter`
      bound to that logger and the resolved request ID, and store it on
      ``req.context.logger_adapter`` for use inside resource handlers.

    Basic example (no logging)::

        import falcon

        app = falcon.App(middleware=[falcon.RequestIDMiddleware()])

        class ThingsResource:
            def on_get(self, req, resp):
                # Access the request ID assigned by the middleware.
                request_id = req.context.request_id

                # ... use request_id for logging, tracing, etc. ...
                resp.media = {'request_id': request_id}

    Logging example::

        import logging
        import falcon

        logger = logging.getLogger('myapp')

        app = falcon.App(
            middleware=[falcon.RequestIDMiddleware(logger=logger)]
        )

        class OrdersResource:
            def on_get(self, req, resp):
                # req.context.logger_adapter is a RequestIDLoggerAdapter.
                # Every record it emits carries request_id automatically.
                log = req.context.logger_adapter
                log.info('Fetching orders')
                log.debug('Query params: %s', req.params)

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
        logger (logging.Logger): An optional :class:`logging.Logger`
            instance. When supplied, a :class:`RequestIDLoggerAdapter`
            wrapping this logger is created for every request and stored
            on ``req.context.logger_adapter``. When omitted (the default),
            no adapter is created and ``req.context.logger_adapter`` is not
            set, incurring zero overhead.
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
        logger: Optional[logging.Logger] = None,
    ):
        self._header_name = header_name
        self._context_attr = context_attr
        self._logger = logger

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

        When a logger was supplied at construction time, a
        :class:`RequestIDLoggerAdapter` bound to that logger and the
        resolved request ID is stored on ``req.context.logger_adapter``.
        If no logger was configured, this step is skipped entirely so
        that requests without logging incur no extra allocations.
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

        if self._logger is not None:
            # NOTE(falcon): A fresh adapter is created per request so
            #   that each req.context.logger_adapter carries exactly
            #   the request_id that belongs to this request.  The
            #   underlying logger instance is shared across requests
            #   (it is stateless), so the only per-request allocation
            #   is the small adapter dict.
            req.context.logger_adapter = RequestIDLoggerAdapter(
                self._logger, {'request_id': request_id}
            )

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
Now export `RequestIDLoggerAdapter` from the main package:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/falcon/__init__.py
old_str
    'CORSMiddleware',
    'RequestIDMiddleware',
new_str
    'CORSMiddleware',
    'RequestIDLoggerAdapter',
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
from falcon.middleware import RequestIDMiddleware
new_str
from falcon.middleware import CORSMiddleware
from falcon.middleware import RequestIDLoggerAdapter
from falcon.middleware import RequestIDMiddleware

output
The file /tmp/inputs/falcon/__init__.py has been edited successfully.
Now add the `TestLoggerIntegration` class to the test file:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/test/test_request_id_middleware.py
old_str
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
new_str
"""Unit tests for :class:`falcon.RequestIDMiddleware`.

These tests exercise the request ID middleware in both the WSGI and ASGI
flavours of Falcon, verifying that:

* A request ID supplied by the client via the ``X-Request-ID`` header is
  honored and echoed back on the response.
* A new UUID is auto-generated when the client does not supply a request ID.
* The request ID is accessible inside resource responders via
  ``req.context.request_id``.
* The ``X-Request-ID`` header is always present on the outgoing response.
* When a logger is configured, a :class:`~falcon.RequestIDLoggerAdapter` is
  available on ``req.context.logger_adapter`` and every emitted record carries
  the ``request_id`` field.
"""

import logging
import uuid

import pytest

import falcon
import falcon.asgi
from falcon import testing
from falcon.middleware import RequestIDLoggerAdapter
from falcon.middleware import RequestIDMiddleware

output
The file /tmp/inputs/test/test_request_id_middleware.py has been edited successfully.
Now append the `TestLoggerIntegration` class and a `_CapturingHandler` helper at the end of the test file:
str_replace_based_edit_tool
command
str_replace
path
/tmp/inputs/test/test_request_id_middleware.py
old_str
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
new_str
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


# ---------------------------------------------------------------------------
# Logging integration helpers
# ---------------------------------------------------------------------------


class _CapturingHandler(logging.Handler):
    """In-memory log handler that accumulates every emitted record."""

    def __init__(self):
        super().__init__()
        self.records: list[logging.LogRecord] = []

    def emit(self, record: logging.LogRecord) -> None:
        self.records.append(record)


def _make_logger(name: str = 'test') -> tuple[logging.Logger, _CapturingHandler]:
    """Return a fresh (logger, handler) pair for each test.

    Using a unique name per call prevents cross-test logger-instance
    sharing inside Python's logging manager.
    """
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    # Remove any handlers left by a previous test using the same name.
    logger.handlers = []
    handler = _CapturingHandler()
    logger.addHandler(handler)
    return logger, handler


# ---------------------------------------------------------------------------
# 5. Logger integration
# ---------------------------------------------------------------------------


class TestLoggerIntegration:
    """Tests for the optional logging integration in RequestIDMiddleware."""

    # ------------------------------------------------------------------
    # test_adapter_created_when_logger_provided
    # ------------------------------------------------------------------

    def test_adapter_created_when_logger_provided(self, asgi):
        """An adapter is available on req.context when a logger is configured."""
        logger, _ = _make_logger('adapter_created')

        if asgi:
            class LoggingResource:
                captured_adapter = None

                async def on_get(self, req, resp):
                    LoggingResource.captured_adapter = req.context.logger_adapter
                    resp.media = {'ok': True}
        else:
            class LoggingResource:
                captured_adapter = None

                def on_get(self, req, resp):
                    LoggingResource.captured_adapter = req.context.logger_adapter
                    resp.media = {'ok': True}

        mw = RequestIDMiddleware(logger=logger)
        if asgi:
            app = falcon.asgi.App(middleware=[mw])
        else:
            app = falcon.App(middleware=[mw])

        app.add_route('/', LoggingResource())
        client = testing.TestClient(app)

        result = client.simulate_get('/')
        assert result.status_code == 200

        adapter = LoggingResource.captured_adapter
        # The adapter must be a RequestIDLoggerAdapter, not the bare logger.
        assert isinstance(adapter, RequestIDLoggerAdapter)
        # The adapter wraps the logger that was passed in.
        assert adapter.logger is logger
        # The adapter's extra dict contains exactly the request ID.
        assert 'request_id' in adapter.extra
        assert adapter.extra['request_id'] == result.headers.get('X-Request-ID')

    # ------------------------------------------------------------------
    # test_adapter_not_created_without_logger
    # ------------------------------------------------------------------

    def test_adapter_not_created_without_logger(self, asgi):
        """No adapter is created when logger=None (the default)."""

        if asgi:
            class NoLogResource:
                captured_context = None

                async def on_get(self, req, resp):
                    NoLogResource.captured_context = req.context
                    resp.media = {'ok': True}
        else:
            class NoLogResource:
                captured_context = None

                def on_get(self, req, resp):
                    NoLogResource.captured_context = req.context
                    resp.media = {'ok': True}

        # NOTE: No logger kwarg -- middleware created with defaults only.
        mw = RequestIDMiddleware()
        if asgi:
            app = falcon.asgi.App(middleware=[mw])
        else:
            app = falcon.App(middleware=[mw])

        app.add_route('/', NoLogResource())
        client = testing.TestClient(app)

        result = client.simulate_get('/')
        assert result.status_code == 200

        ctx = NoLogResource.captured_context
        # request_id must still be present (core feature unaffected).
        assert ctx.request_id == result.headers.get('X-Request-ID')
        # logger_adapter must NOT have been set at all.
        assert 'logger_adapter' not in ctx

    # ------------------------------------------------------------------
    # test_log_records_include_request_id
    # ------------------------------------------------------------------

    def test_log_records_include_request_id(self, asgi):
        """Every log record emitted via the adapter carries the request_id field."""
        logger, handler = _make_logger('records_include_rid')

        if asgi:
            class EmittingResource:
                async def on_get(self, req, resp):
                    log = req.context.logger_adapter
                    log.debug('debug message')
                    log.info('info message')
                    log.warning('warning message')
                    resp.media = {'ok': True}
        else:
            class EmittingResource:
                def on_get(self, req, resp):
                    log = req.context.logger_adapter
                    log.debug('debug message')
                    log.info('info message')
                    log.warning('warning message')
                    resp.media = {'ok': True}

        mw = RequestIDMiddleware(logger=logger)
        if asgi:
            app = falcon.asgi.App(middleware=[mw])
        else:
            app = falcon.App(middleware=[mw])

        app.add_route('/', EmittingResource())
        client = testing.TestClient(app)

        supplied_id = 'log-record-check'
        result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})
        assert result.status_code == 200

        assert len(handler.records) == 3

        for record in handler.records:
            # Every record must expose request_id as a top-level attribute.
            assert hasattr(record, 'request_id'), (
                'LogRecord is missing the request_id field'
            )
            assert record.request_id == supplied_id

        # Confirm level names are correct as a basic sanity check.
        assert handler.records[0].levelname == 'DEBUG'
        assert handler.records[1].levelname == 'INFO'
        assert handler.records[2].levelname == 'WARNING'

    # ------------------------------------------------------------------
    # test_adapter_works_in_async_handler
    # ------------------------------------------------------------------

    def test_adapter_works_in_async_handler(self, asgi):
        """The adapter created for ASGI handlers logs records with request_id."""
        # NOTE: This test is only meaningful for the ASGI flavour; skip it
        #   for WSGI so the assertion reads clearly and the overall run stays
        #   symmetric with the parametrized fixture.
        if not asgi:
            pytest.skip('ASGI-specific test')

        logger, handler = _make_logger('async_handler')

        class AsyncEmittingResource:
            async def on_get(self, req, resp):
                log = req.context.logger_adapter
                log.info('async handler fired')
                resp.media = {'ok': True}

        mw = RequestIDMiddleware(logger=logger)
        app = falcon.asgi.App(middleware=[mw])
        app.add_route('/', AsyncEmittingResource())
        client = testing.TestClient(app)

        supplied_id = 'async-handler-id'
        result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})
        assert result.status_code == 200

        assert len(handler.records) == 1
        record = handler.records[0]
        assert hasattr(record, 'request_id')
        assert record.request_id == supplied_id
        assert record.getMessage() == 'async handler fired'

    # ------------------------------------------------------------------
    # test_multiple_requests_separate_adapters
    # ------------------------------------------------------------------

    def test_multiple_requests_separate_adapters(self, asgi):
        """Concurrent requests get independent adapter instances."""
        logger, handler = _make_logger('separate_adapters')

        captured_adapters: list[RequestIDLoggerAdapter] = []

        if asgi:
            class MultiResource:
                async def on_get(self, req, resp):
                    captured_adapters.append(req.context.logger_adapter)
                    req.context.logger_adapter.info('request processed')
                    resp.media = {'ok': True}
        else:
            class MultiResource:
                def on_get(self, req, resp):
                    captured_adapters.append(req.context.logger_adapter)
                    req.context.logger_adapter.info('request processed')
                    resp.media = {'ok': True}

        mw = RequestIDMiddleware(logger=logger)
        if asgi:
            app = falcon.asgi.App(middleware=[mw])
        else:
            app = falcon.App(middleware=[mw])

        app.add_route('/', MultiResource())
        client = testing.TestClient(app)

        id_one = 'first-request-id'
        id_two = 'second-request-id'

        client.simulate_get('/', headers={'X-Request-ID': id_one})
        client.simulate_get('/', headers={'X-Request-ID': id_two})

        assert len(captured_adapters) == 2

        adapter_one, adapter_two = captured_adapters

        # Adapters must be distinct objects -- not the same instance reused.
        assert adapter_one is not adapter_two

        # Each adapter's extra carries only the ID for its own request.
        assert adapter_one.extra['request_id'] == id_one
        assert adapter_two.extra['request_id'] == id_two

        # Both adapters wrap the same underlying logger instance.
        assert adapter_one.logger is logger
        assert adapter_two.logger is logger

        # The two log records carry their respective IDs.
        assert len(handler.records) == 2
        assert handler.records[0].request_id == id_one
        assert handler.records[1].request_id == id_two

output
The file /tmp/inputs/test/test_request_id_middleware.py has been edited successfully.
Now run the full test suite:
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
collecting ... collected 45 items

test/test_request_id_middleware.py::test_middleware_is_exported_from_falcon PASSED [  2%]
test/test_request_id_middleware.py::test_uses_client_supplied_request_id[wsgi] PASSED [  4%]
test/test_request_id_middleware.py::test_uses_client_supplied_request_id[asgi] PASSED [  6%]
test/test_request_id_middleware.py::test_client_supplied_id_is_case_insensitive[wsgi] PASSED [  8%]
test/test_request_id_middleware.py::test_client_supplied_id_is_case_insensitive[asgi] PASSED [ 11%]
test/test_request_id_middleware.py::test_client_supplied_id_is_not_overwritten[wsgi] PASSED [ 13%]
test/test_request_id_middleware.py::test_client_supplied_id_is_not_overwritten[asgi] PASSED [ 15%]
test/test_request_id_middleware.py::test_generates_request_id_when_not_provided[wsgi] PASSED [ 17%]
test/test_request_id_middleware.py::test_generates_request_id_when_not_provided[asgi] PASSED [ 20%]
test/test_request_id_middleware.py::test_generated_ids_are_unique_across_requests[wsgi] PASSED [ 22%]
test/test_request_id_middleware.py::test_generated_ids_are_unique_across_requests[asgi] PASSED [ 24%]
test/test_request_id_middleware.py::test_empty_header_triggers_generation[wsgi] PASSED [ 26%]
test/test_request_id_middleware.py::test_empty_header_triggers_generation[asgi] PASSED [ 28%]
test/test_request_id_middleware.py::test_request_id_available_on_context_attribute[wsgi] PASSED [ 31%]
test/test_request_id_middleware.py::test_request_id_available_on_context_attribute[asgi] PASSED [ 33%]
test/test_request_id_middleware.py::test_request_id_available_before_responder_runs[wsgi] PASSED [ 35%]
test/test_request_id_middleware.py::test_request_id_available_before_responder_runs[asgi] PASSED [ 37%]
test/test_request_id_middleware.py::test_response_header_is_set_when_client_supplied[wsgi] PASSED [ 40%]
test/test_request_id_middleware.py::test_response_header_is_set_when_client_supplied[asgi] PASSED [ 42%]
test/test_request_id_middleware.py::test_response_header_is_set_when_auto_generated[wsgi] PASSED [ 44%]
test/test_request_id_middleware.py::test_response_header_is_set_when_auto_generated[asgi] PASSED [ 46%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[wsgi] PASSED [ 48%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[asgi] PASSED [ 51%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[wsgi] PASSED [ 53%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[asgi] PASSED [ 55%]
test/test_request_id_middleware.py::test_response_header_is_set_on_error[wsgi] PASSED [ 57%]
test/test_request_id_middleware.py::test_response_header_is_set_on_error[asgi] PASSED [ 60%]
test/test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[wsgi] PASSED [ 62%]
test/test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[asgi] PASSED [ 64%]
test/test_request_id_middleware.py::test_custom_header_name[wsgi] PASSED [ 66%]
test/test_request_id_middleware.py::test_custom_header_name[asgi] PASSED [ 68%]
test/test_request_id_middleware.py::test_custom_context_attr[wsgi] PASSED [ 71%]
test/test_request_id_middleware.py::test_custom_context_attr[asgi] PASSED [ 73%]
test/test_request_id_middleware.py::test_custom_id_generator[wsgi] PASSED [ 75%]
test/test_request_id_middleware.py::test_custom_id_generator[asgi] PASSED [ 77%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_created_when_logger_provided[wsgi] PASSED [ 80%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_created_when_logger_provided[asgi] PASSED [ 82%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_not_created_without_logger[wsgi] PASSED [ 84%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_not_created_without_logger[asgi] PASSED [ 86%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_log_records_include_request_id[wsgi] PASSED [ 88%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_log_records_include_request_id[asgi] PASSED [ 91%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_works_in_async_handler[wsgi] SKIPPED [ 93%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_works_in_async_handler[asgi] PASSED [ 95%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_multiple_requests_separate_adapters[wsgi] PASSED [ 97%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_multiple_requests_separate_adapters[asgi] PASSED [100%]

======================== 44 passed, 1 skipped in 0.57s =========================
All 35 original tests still pass, 9 new tests pass (1 intentional skip for the WSGI leg of the ASGI-only test). Now run the style checks:
bash
command
cd /tmp/inputs && python3 -m flake8 falcon/middleware.py --max-line-length=99
echo "flake8 middleware exit: $?"
python3 -m flake8 test/test_request_id_middleware.py --max-line-length=99
echo "flake8 tests exit: $?"
python3 -m pycodestyle falcon/middleware.py --max-line-length=99
echo "pycodestyle middleware exit: $?"
python3 -m pycodestyle test/test_request_id_middleware.py --max-line-length=99
echo "pycodestyle tests exit: $?"

output
flake8 middleware exit: 0
flake8 tests exit: 0
pycodestyle middleware exit: 0
pycodestyle tests exit: 0
Clean. Now copy to `/tmp/outputs`:
bash
command
cp /tmp/inputs/falcon/middleware.py /tmp/outputs/middleware.py
cp /tmp/inputs/test/test_request_id_middleware.py /tmp/outputs/test_request_id_middleware.py

system
Tool ran without output or errors
Let me do a final read of both output files to verify correctness end-to-end:
bash
command
cat /tmp/outputs/middleware.py

output
from __future__ import annotations

from collections.abc import Iterable
import logging
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


class RequestIDLoggerAdapter(logging.LoggerAdapter):
"""A :class:`logging.LoggerAdapter` that injects the request ID into log records.

Every log record emitted through this adapter will carry a ``request_id``
field on the :class:`~logging.LogRecord`, making it straightforward to
include the ID in formatter strings or structured-logging pipelines::

# In a log format string:
'%(levelname)s [%(request_id)s] %(message)s'

Instances are created automatically by :class:`RequestIDMiddleware` when a
logger is configured, and stored on ``req.context.logger_adapter`` for the
lifetime of each request.  Resource handlers retrieve the adapter from the
context rather than constructing it themselves::

class OrdersResource:
def on_get(self, req, resp):
log = req.context.logger_adapter
log.info('Fetching orders')
# Every record emitted by `log` contains request_id.

The adapter's :meth:`process` method merges any ``extra`` dict supplied by
the caller at the call site with the adapter's own ``extra`` dict (which
always contains ``request_id``).  The caller-supplied keys take precedence
so that per-call context can extend rather than replace the adapter's base
context.
"""

def process(self, msg: str, kwargs: dict) -> tuple[str, dict]:
"""Merge the request ID with any per-call extra fields.

The adapter's ``extra`` dict (containing ``request_id``) is merged
with any ``extra`` dict supplied by the caller.  Caller-supplied keys
win on collision so that handlers can enrich individual records without
losing the request ID.
"""
# NOTE(falcon): {**self.extra, **caller_extra} gives caller keys
#   priority.  This differs from the stdlib default, which silently
#   drops caller extra entirely.
merged = {**self.extra, **kwargs.get('extra', {})}
kwargs['extra'] = merged
return msg, kwargs


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
* When *logger* is provided, create a :class:`RequestIDLoggerAdapter`
bound to that logger and the resolved request ID, and store it on
``req.context.logger_adapter`` for use inside resource handlers.

Basic example (no logging)::

import falcon

app = falcon.App(middleware=[falcon.RequestIDMiddleware()])

class ThingsResource:
def on_get(self, req, resp):
# Access the request ID assigned by the middleware.
request_id = req.context.request_id

# ... use request_id for logging, tracing, etc. ...
resp.media = {'request_id': request_id}

Logging example::

import logging
import falcon

logger = logging.getLogger('myapp')

app = falcon.App(
middleware=[falcon.RequestIDMiddleware(logger=logger)]
)

class OrdersResource:
def on_get(self, req, resp):
# req.context.logger_adapter is a RequestIDLoggerAdapter.
# Every record it emits carries request_id automatically.
log = req.context.logger_adapter
log.info('Fetching orders')
log.debug('Query params: %s', req.params)

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
logger (logging.Logger): An optional :class:`logging.Logger`
instance. When supplied, a :class:`RequestIDLoggerAdapter`
wrapping this logger is created for every request and stored
on ``req.context.logger_adapter``. When omitted (the default),
no adapter is created and ``req.context.logger_adapter`` is not
set, incurring zero overhead.
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
logger: Optional[logging.Logger] = None,
):
self._header_name = header_name
self._context_attr = context_attr
self._logger = logger

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

When a logger was supplied at construction time, a
:class:`RequestIDLoggerAdapter` bound to that logger and the
resolved request ID is stored on ``req.context.logger_adapter``.
If no logger was configured, this step is skipped entirely so
that requests without logging incur no extra allocations.
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

if self._logger is not None:
# NOTE(falcon): A fresh adapter is created per request so
#   that each req.context.logger_adapter carries exactly
#   the request_id that belongs to this request.  The
#   underlying logger instance is shared across requests
#   (it is stateless), so the only per-request allocation
#   is the small adapter dict.
req.context.logger_adapter = RequestIDLoggerAdapter(
self._logger, {'request_id': request_id}
)

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
cat /tmp/outputs/test_request_id_middleware.py

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
* When a logger is configured, a :class:`~falcon.RequestIDLoggerAdapter` is
available on ``req.context.logger_adapter`` and every emitted record carries
the ``request_id`` field.
"""

import logging
import uuid

import pytest

import falcon
import falcon.asgi
from falcon import testing
from falcon.middleware import RequestIDLoggerAdapter
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


# ---------------------------------------------------------------------------
# Logging integration helpers
# ---------------------------------------------------------------------------


class _CapturingHandler(logging.Handler):
"""In-memory log handler that accumulates every emitted record."""

def __init__(self):
super().__init__()
self.records: list[logging.LogRecord] = []

def emit(self, record: logging.LogRecord) -> None:
self.records.append(record)


def _make_logger(name: str = 'test') -> tuple[logging.Logger, _CapturingHandler]:
"""Return a fresh (logger, handler) pair for each test.

Using a unique name per call prevents cross-test logger-instance
sharing inside Python's logging manager.
"""
logger = logging.getLogger(name)
logger.setLevel(logging.DEBUG)
# Remove any handlers left by a previous test using the same name.
logger.handlers = []
handler = _CapturingHandler()
logger.addHandler(handler)
return logger, handler


# ---------------------------------------------------------------------------
# 5. Logger integration
# ---------------------------------------------------------------------------


class TestLoggerIntegration:
"""Tests for the optional logging integration in RequestIDMiddleware."""

# ------------------------------------------------------------------
# test_adapter_created_when_logger_provided
# ------------------------------------------------------------------

def test_adapter_created_when_logger_provided(self, asgi):
"""An adapter is available on req.context when a logger is configured."""
logger, _ = _make_logger('adapter_created')

if asgi:
class LoggingResource:
captured_adapter = None

async def on_get(self, req, resp):
LoggingResource.captured_adapter = req.context.logger_adapter
resp.media = {'ok': True}
else:
class LoggingResource:
captured_adapter = None

def on_get(self, req, resp):
LoggingResource.captured_adapter = req.context.logger_adapter
resp.media = {'ok': True}

mw = RequestIDMiddleware(logger=logger)
if asgi:
app = falcon.asgi.App(middleware=[mw])
else:
app = falcon.App(middleware=[mw])

app.add_route('/', LoggingResource())
client = testing.TestClient(app)

result = client.simulate_get('/')
assert result.status_code == 200

adapter = LoggingResource.captured_adapter
# The adapter must be a RequestIDLoggerAdapter, not the bare logger.
assert isinstance(adapter, RequestIDLoggerAdapter)
# The adapter wraps the logger that was passed in.
assert adapter.logger is logger
# The adapter's extra dict contains exactly the request ID.
assert 'request_id' in adapter.extra
assert adapter.extra['request_id'] == result.headers.get('X-Request-ID')

# ------------------------------------------------------------------
# test_adapter_not_created_without_logger
# ------------------------------------------------------------------

def test_adapter_not_created_without_logger(self, asgi):
"""No adapter is created when logger=None (the default)."""

if asgi:
class NoLogResource:
captured_context = None

async def on_get(self, req, resp):
NoLogResource.captured_context = req.context
resp.media = {'ok': True}
else:
class NoLogResource:
captured_context = None

def on_get(self, req, resp):
NoLogResource.captured_context = req.context
resp.media = {'ok': True}

# NOTE: No logger kwarg -- middleware created with defaults only.
mw = RequestIDMiddleware()
if asgi:
app = falcon.asgi.App(middleware=[mw])
else:
app = falcon.App(middleware=[mw])

app.add_route('/', NoLogResource())
client = testing.TestClient(app)

result = client.simulate_get('/')
assert result.status_code == 200

ctx = NoLogResource.captured_context
# request_id must still be present (core feature unaffected).
assert ctx.request_id == result.headers.get('X-Request-ID')
# logger_adapter must NOT have been set at all.
assert 'logger_adapter' not in ctx

# ------------------------------------------------------------------
# test_log_records_include_request_id
# ------------------------------------------------------------------

def test_log_records_include_request_id(self, asgi):
"""Every log record emitted via the adapter carries the request_id field."""
logger, handler = _make_logger('records_include_rid')

if asgi:
class EmittingResource:
async def on_get(self, req, resp):
log = req.context.logger_adapter
log.debug('debug message')
log.info('info message')
log.warning('warning message')
resp.media = {'ok': True}
else:
class EmittingResource:
def on_get(self, req, resp):
log = req.context.logger_adapter
log.debug('debug message')
log.info('info message')
log.warning('warning message')
resp.media = {'ok': True}

mw = RequestIDMiddleware(logger=logger)
if asgi:
app = falcon.asgi.App(middleware=[mw])
else:
app = falcon.App(middleware=[mw])

app.add_route('/', EmittingResource())
client = testing.TestClient(app)

supplied_id = 'log-record-check'
result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})
assert result.status_code == 200

assert len(handler.records) == 3

for record in handler.records:
# Every record must expose request_id as a top-level attribute.
assert hasattr(record, 'request_id'), (
'LogRecord is missing the request_id field'
)
assert record.request_id == supplied_id

# Confirm level names are correct as a basic sanity check.
assert handler.records[0].levelname == 'DEBUG'
assert handler.records[1].levelname == 'INFO'
assert handler.records[2].levelname == 'WARNING'

# ------------------------------------------------------------------
# test_adapter_works_in_async_handler
# ------------------------------------------------------------------

def test_adapter_works_in_async_handler(self, asgi):
"""The adapter created for ASGI handlers logs records with request_id."""
# NOTE: This test is only meaningful for the ASGI flavour; skip it
#   for WSGI so the assertion reads clearly and the overall run stays
#   symmetric with the parametrized fixture.
if not asgi:
pytest.skip('ASGI-specific test')

logger, handler = _make_logger('async_handler')

class AsyncEmittingResource:
async def on_get(self, req, resp):
log = req.context.logger_adapter
log.info('async handler fired')
resp.media = {'ok': True}

mw = RequestIDMiddleware(logger=logger)
app = falcon.asgi.App(middleware=[mw])
app.add_route('/', AsyncEmittingResource())
client = testing.TestClient(app)

supplied_id = 'async-handler-id'
result = client.simulate_get('/', headers={'X-Request-ID': supplied_id})
assert result.status_code == 200

assert len(handler.records) == 1
record = handler.records[0]
assert hasattr(record, 'request_id')
assert record.request_id == supplied_id
assert record.getMessage() == 'async handler fired'

# ------------------------------------------------------------------
# test_multiple_requests_separate_adapters
# ------------------------------------------------------------------

def test_multiple_requests_separate_adapters(self, asgi):
"""Concurrent requests get independent adapter instances."""
logger, handler = _make_logger('separate_adapters')

captured_adapters: list[RequestIDLoggerAdapter] = []

if asgi:
class MultiResource:
async def on_get(self, req, resp):
captured_adapters.append(req.context.logger_adapter)
req.context.logger_adapter.info('request processed')
resp.media = {'ok': True}
else:
class MultiResource:
def on_get(self, req, resp):
captured_adapters.append(req.context.logger_adapter)
req.context.logger_adapter.info('request processed')
resp.media = {'ok': True}

mw = RequestIDMiddleware(logger=logger)
if asgi:
app = falcon.asgi.App(middleware=[mw])
else:
app = falcon.App(middleware=[mw])

app.add_route('/', MultiResource())
client = testing.TestClient(app)

id_one = 'first-request-id'
id_two = 'second-request-id'

client.simulate_get('/', headers={'X-Request-ID': id_one})
client.simulate_get('/', headers={'X-Request-ID': id_two})

assert len(captured_adapters) == 2

adapter_one, adapter_two = captured_adapters

# Adapters must be distinct objects -- not the same instance reused.
assert adapter_one is not adapter_two

# Each adapter's extra carries only the ID for its own request.
assert adapter_one.extra['request_id'] == id_one
assert adapter_two.extra['request_id'] == id_two

# Both adapters wrap the same underlying logger instance.
assert adapter_one.logger is logger
assert adapter_two.logger is logger

# The two log records carry their respective IDs.
assert len(handler.records) == 2
assert handler.records[0].request_id == id_one
assert handler.records[1].request_id == id_two
Both files look exactly right. Let me do one final clean run to confirm the output files are the ones passing:
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
collecting ... collected 45 items

test/test_request_id_middleware.py::test_middleware_is_exported_from_falcon PASSED [  2%]
test/test_request_id_middleware.py::test_uses_client_supplied_request_id[wsgi] PASSED [  4%]
test/test_request_id_middleware.py::test_uses_client_supplied_request_id[asgi] PASSED [  6%]
test/test_request_id_middleware.py::test_client_supplied_id_is_case_insensitive[wsgi] PASSED [  8%]
test/test_request_id_middleware.py::test_client_supplied_id_is_case_insensitive[asgi] PASSED [ 11%]
test/test_request_id_middleware.py::test_client_supplied_id_is_not_overwritten[wsgi] PASSED [ 13%]
test/test_request_id_middleware.py::test_client_supplied_id_is_not_overwritten[asgi] PASSED [ 15%]
test/test_request_id_middleware.py::test_generates_request_id_when_not_provided[wsgi] PASSED [ 17%]
test/test_request_id_middleware.py::test_generates_request_id_when_not_provided[asgi] PASSED [ 20%]
test/test_request_id_middleware.py::test_generated_ids_are_unique_across_requests[wsgi] PASSED [ 22%]
test/test_request_id_middleware.py::test_generated_ids_are_unique_across_requests[asgi] PASSED [ 24%]
test/test_request_id_middleware.py::test_empty_header_triggers_generation[wsgi] PASSED [ 26%]
test/test_request_id_middleware.py::test_empty_header_triggers_generation[asgi] PASSED [ 28%]
test/test_request_id_middleware.py::test_request_id_available_on_context_attribute[wsgi] PASSED [ 31%]
test/test_request_id_middleware.py::test_request_id_available_on_context_attribute[asgi] PASSED [ 33%]
test/test_request_id_middleware.py::test_request_id_available_before_responder_runs[wsgi] PASSED [ 35%]
test/test_request_id_middleware.py::test_request_id_available_before_responder_runs[asgi] PASSED [ 37%]
test/test_request_id_middleware.py::test_response_header_is_set_when_client_supplied[wsgi] PASSED [ 40%]
test/test_request_id_middleware.py::test_response_header_is_set_when_client_supplied[asgi] PASSED [ 42%]
test/test_request_id_middleware.py::test_response_header_is_set_when_auto_generated[wsgi] PASSED [ 44%]
test/test_request_id_middleware.py::test_response_header_is_set_when_auto_generated[asgi] PASSED [ 46%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[wsgi] PASSED [ 48%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests[asgi] PASSED [ 51%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[wsgi] PASSED [ 53%]
test/test_request_id_middleware.py::test_response_header_is_set_for_unrouted_requests_client_supplied[asgi] PASSED [ 55%]
test/test_request_id_middleware.py::test_response_header_is_set_on_error[wsgi] PASSED [ 57%]
test/test_request_id_middleware.py::test_response_header_is_set_on_error[asgi] PASSED [ 60%]
test/test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[wsgi] PASSED [ 62%]
test/test_request_id_middleware.py::test_response_header_not_overridden_if_already_set[asgi] PASSED [ 64%]
test/test_request_id_middleware.py::test_custom_header_name[wsgi] PASSED [ 66%]
test/test_request_id_middleware.py::test_custom_header_name[asgi] PASSED [ 68%]
test/test_request_id_middleware.py::test_custom_context_attr[wsgi] PASSED [ 71%]
test/test_request_id_middleware.py::test_custom_context_attr[asgi] PASSED [ 73%]
test/test_request_id_middleware.py::test_custom_id_generator[wsgi] PASSED [ 75%]
test/test_request_id_middleware.py::test_custom_id_generator[asgi] PASSED [ 77%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_created_when_logger_provided[wsgi] PASSED [ 80%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_created_when_logger_provided[asgi] PASSED [ 82%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_not_created_without_logger[wsgi] PASSED [ 84%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_not_created_without_logger[asgi] PASSED [ 86%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_log_records_include_request_id[wsgi] PASSED [ 88%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_log_records_include_request_id[asgi] PASSED [ 91%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_works_in_async_handler[wsgi] SKIPPED [ 93%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_adapter_works_in_async_handler[asgi] PASSED [ 95%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_multiple_requests_separate_adapters[wsgi] PASSED [ 97%]
test/test_request_id_middleware.py::TestLoggerIntegration::test_multiple_requests_separate_adapters[asgi] PASSED [100%]

======================== 44 passed, 1 skipped in 0.62s =========================
44 passed, 1 intentional skip. Everything is clean.

Here is a precise account of every decision made.

---

## What was changed and exactly why

### Pre-work: deep reading before any code was written

Before touching either file, I ran several targeted explorations:

1. **`logging.LoggerAdapter.process()` behaviour on Python 3.9** — the stdlib default wipes any `extra` dict the caller passes to a log call (`kwargs['extra'] = self.extra`). That means a handler can never attach its own per-record fields without losing the adapter's fields. The fix is to override `process()` and merge with `{**self.extra, **kwargs.get('extra', {})}`. This was verified empirically so no assumptions were made.

2. **Where `request_id` lands on a `LogRecord`** — confirmed that when `extra={'request_id': '...'}` is passed through `process()`, the value becomes a first-class attribute `record.request_id` on the record, accessible in format strings as `%(request_id)s` and directly in handlers. This is what the tests assert against.

3. **`logging.LoggerAdapter.__init__` signature on Python 3.9** — it takes `(logger, extra)`. Python 3.12 added a `merge_extra` keyword but that is not available here, reinforcing that we must override `process()` ourselves.

4. **`falcon.Context` attribute namespace** — confirmed `logger_adapter` is not a reserved name and would not shadow any existing attribute on the `Context` class.

5. **Line-length budget and `NOTE(...)` comment style** — measured the existing file ceiling at 99 characters. All NOTE comments in the production file use the `# NOTE(falcon):` prefix with two-space continuation indentation; all NOTE comments in the test file use bare `# NOTE:` or `# NOTE(tests):`. Both patterns were matched exactly.

---

### `falcon/middleware.py` — four changes

**1. Added `import logging` to the module-level imports.**
Placed in alphabetical order within the stdlib block (`collections.abc` → `logging` → `typing` → `uuid`), exactly where the existing imports are sorted.

**2. Added `RequestIDLoggerAdapter` as a standalone class above `RequestIDMiddleware`.**
It extends `logging.LoggerAdapter` and overrides only `process()`. The `process()` override does one thing: build a merged `extra` dict where the adapter's own `{'request_id': ...}` forms the base and any `extra` the caller passes at the call site overlays it. This means `request_id` is always present on every record, and callers who want to add more context per-call (e.g., `log.info('msg', extra={'order_id': 42})`) get both fields without any boilerplate. The class docstring explains the format-string usage, the fact that instances are created by the middleware rather than by user code, and the merging behaviour. The `process()` docstring carries the NOTE comment explaining why this diverges from the stdlib default.

**3. Updated `RequestIDMiddleware.__init__`.**
Added `logger: Optional[logging.Logger] = None` as the fourth keyword argument, stored as `self._logger`. The ordering preserves all three existing parameters first and puts the new one last, which is standard for additive backwards-compatible additions. The `logger` parameter is fully documented in the class docstring under "Keyword Arguments" in the same style as the other three (`param (type): description. When ... When ...`).

**4. Updated `RequestIDMiddleware.process_request`.**
After the two existing lines that write `req.context[self._context_attr] = request_id`, a single `if self._logger is not None:` block creates and stores the adapter. The guard is an identity check against `None`, not a truthiness check, because a `logging.Logger` instance is always truthy — the `None` default is specifically what signals "logging not requested". The adapter is constructed as `RequestIDLoggerAdapter(self._logger, {'request_id': request_id})` and stored directly as `req.context.logger_adapter`. The NOTE comment in the `if` block explains the per-request allocation choice: the logger itself is stateless and shared; the only allocation per request is the small `extra` dict inside the adapter.

**5. Updated `RequestIDMiddleware.process_request` docstring.**
Added a second paragraph describing what happens when a logger is configured, and the explicit statement that if no logger was configured the step is skipped with zero overhead. This matches the docstring style already used in `process_response`.

**6. Updated the class docstring.**
The existing "Example::" block was relabelled "Basic example (no logging)::" to make room for a new "Logging example::" block immediately after it. The logging example shows `logging.getLogger`, constructing the middleware with `logger=logger`, and a resource handler that reads `req.context.logger_adapter` and calls `log.info()` and `log.debug()` on it. This is the minimal show-don't-tell example a developer needs.

**No changes were made to `process_response`, `process_request_async`, or `process_response_async`** — the async delegates already call `process_request` and `process_response`, so ASGI support came for free.

---

### `falcon/__init__.py` — two changes

`'RequestIDLoggerAdapter'` was added to `__all__` between `'CORSMiddleware'` and `'RequestIDMiddleware'` (alphabetical order), and `from falcon.middleware import RequestIDLoggerAdapter` was added between the `CORSMiddleware` and `RequestIDMiddleware` import lines in the same file (same alphabetical position, same one-symbol-per-line style).

---

### `test/test_request_id_middleware.py` — three changes

**1. Added `import logging` and `from falcon.middleware import RequestIDLoggerAdapter` to the imports.**
`logging` is placed in the stdlib block in alphabetical order. `RequestIDLoggerAdapter` is added as a second import from `falcon.middleware`, one symbol per line, sorted.

**2. Added the `_CapturingHandler` helper and `_make_logger` factory above the new test class.**
`_CapturingHandler` is a minimal `logging.Handler` subclass that appends every `LogRecord` it receives to a list. It is module-level, private (underscore prefix), matching the `_RecordingResource` convention already in the file. `_make_logger` creates an isolated `(logger, handler)` pair for each test: it calls `logging.getLogger` with a unique name, sets the level to `DEBUG`, clears any leftover handlers from a previous test with the same name, attaches a fresh `_CapturingHandler`, and returns both objects. This isolation is important because Python's `logging` module caches loggers by name — without clearing handlers, records from test A would accumulate in test B's handler.

**3. Added `class TestLoggerIntegration` with five test methods.**
The class uses the existing module-level `asgi` fixture, so each method is automatically parametrized over `[wsgi, asgi]` exactly like all other tests in the file.

- **`test_adapter_created_when_logger_provided`** — passes `logger=logger` to `RequestIDMiddleware`, captures `req.context.logger_adapter` inside the responder, then asserts: it is a `RequestIDLoggerAdapter`, it wraps the exact `logger` object that was passed in (using `is`, not `==`), and its `extra['request_id']` matches what was echoed on the response header.

- **`test_adapter_not_created_without_logger`** — creates the middleware with no `logger` argument (pure defaults). Asserts `'logger_adapter' not in ctx` using the `Context` mapping interface, i.e. that the attribute was never set at all. Also asserts that `request_id` is still present — confirming the core feature is completely unaffected by the opt-in logging path.

- **`test_log_records_include_request_id`** — calls `log.debug`, `log.info`, and `log.warning` inside the responder, then iterates all three captured records and asserts `hasattr(record, 'request_id')` and `record.request_id == supplied_id`. Also checks the level names in order to confirm records arrived in emission order without reordering.

- **`test_adapter_works_in_async_handler`** — ASGI-specific. The test body begins with `if not asgi: pytest.skip(...)`, which cleanly produces one SKIP for the WSGI leg of the parametrize rather than a conditional absence from the run. The actual assertions are identical to the single-record subset of `test_log_records_include_request_id`, plus `record.getMessage()` to confirm the message text survived the async code path unchanged.

- **`test_multiple_requests_separate_adapters`** — makes two consecutive requests with different client-supplied IDs. Captures both adapter instances in a list. Asserts they are distinct objects (`adapter_one is not adapter_two`), that each adapter's `extra['request_id']` matches only its own request's ID, that both adapters wrap the same underlying logger (`adapter_one.logger is logger` and `adapter_two.logger is logger`), and that the two captured log records carry the correct IDs in arrival order.