import{_ as d,c as e,aO as r,o as a}from"./chunks/framework.DEWO2zTc.js";const o="/blogBuild/network/HttpCacheWorkFlow.png",n="/blogBuild/network/ExpirationCaching.png",i="/blogBuild/network/ValidationCaching.png",u=JSON.parse('{"title":"HTTP缓存","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge/network/http/index.md","filePath":"knowledge/network/http/index.md"}'),l={name:"knowledge/network/http/index.md"};function c(h,t,s,p,f,g){return a(),e("div",null,t[0]||(t[0]=[r('<h1 id="http缓存" tabindex="-1">HTTP缓存 <a class="header-anchor" href="#http缓存" aria-label="Permalink to &quot;HTTP缓存&quot;">​</a></h1><h2 id="刷新手段" tabindex="-1">刷新手段 <a class="header-anchor" href="#刷新手段" aria-label="Permalink to &quot;刷新手段&quot;">​</a></h2><p>不同的刷新手段，会导致浏览器使用不同的缓存策略, 用户刷新/访问行为 的手段分成三类：</p><ol><li>在URI输入栏中输入然后回车/通过书签访问</li><li>F5/点击工具栏中的刷新按钮/右键菜单重新加载</li><li>Ctl+F5 （完全不使用HTTP缓存）</li></ol><h2 id="http缓存流程图" tabindex="-1">HTTP缓存流程图 <a class="header-anchor" href="#http缓存流程图" aria-label="Permalink to &quot;HTTP缓存流程图&quot;">​</a></h2><p><img src="'+o+'" alt="An image"> 浏览器发送请求，首先判断是否命中强制缓存。如果缓存没有过期，命中强制缓存，从缓存读取。如果没有命中强制缓存 则检查是否命中协商缓存。浏览器将备份的缓存标识发送给服务器, ETag缓存标志优先级高于Last-Modified, 如果有ETag的缓存标志，首先检查ETag缓存标志，通过请求头携带If-None-Match标志， 对比资源当前的Etag是否跟If-None-Match一致， 如果一致则返回304，如果不一致， 则等待请求响应，缓存标志。如果没有ETag的缓存标志, 检查Last-Modified的缓存标志， 通过请求头携带If-Modified-Since，比对资源当前最后的修改时间，判断是否资源有改动，未改动，返回304，有改动，等待请求响应，缓存标志。</p><h3 id="强制缓存" tabindex="-1">强制缓存 <a class="header-anchor" href="#强制缓存" aria-label="Permalink to &quot;强制缓存&quot;">​</a></h3><p><img src="'+n+'" alt="An image"> 强制缓存，在缓存数据未失效的情况下，可以直接使用缓存数据，不需要再请求服务器。 判断是否命中强制缓存的依据, 相应header中会有两个字段标明失效规则(Expires/Cache-Control)：</p><ol><li>Expires： 它的值为服务端返回的到期时间，即下一次请求时，请求时间小于服务端返回的到期时间，直接使用缓存数据。在HTTP 1.1 的版本，Expires被Cache-Control替代。</li><li>Cache-Control： Cache-Control是最重要的规则。常见的取值有private、public、no-cache、max-age，no-store，默认为private。 <ol><li>max-age：用来设置资源（representations）可以被缓存多长时间，单位为秒；</li><li>s-maxage：和max-age是一样的，不过它只针对代理服务器缓存而言；</li><li>public：指示响应可被任何缓存区缓存；</li><li>private：只能针对个人用户，而不能被代理服务器缓存；</li><li>no-cache：强制客户端直接向服务器发送请求,也就是说每次请求都必须向服务器发送。服务器接收到 请求，然后判断资源是否变更，是则返回新内容，否则返回304，未变更。这个很容易让人产生误解，使人误 以为是响应不被缓存。实际上Cache-Control: no-cache是会被缓存的，只不过每次在向客户端（浏览器）提供响应数据时，缓存都要向服务器评估缓存响应的有效性。</li><li>no-store：禁止一切缓存（这个才是响应不被缓存的意思）。</li></ol></li></ol><h3 id="协商缓存-对比缓存" tabindex="-1">协商缓存/对比缓存 <a class="header-anchor" href="#协商缓存-对比缓存" aria-label="Permalink to &quot;协商缓存/对比缓存&quot;">​</a></h3><p>在浏览器已经缓存数据的情况下，使用对比缓存去请求数据的流程是这样的： <img src="'+i+'" alt="An image"> 浏览器第一次请求数据时，服务器会将缓存标识与数据一起返回给浏览器，浏览器将二者备份至缓存数据库中。 当浏览器再次请求数据时，浏览器将备份的缓存标识发送给服务器，服务器根据缓存标识进行判断，判断成功后，返回304状态码，通知客户端比较成功，可以使用缓存数据。 对比缓存，响应header中会有两个字段来标明规则</p><ol><li>Last-Modified / If-Modified-Since 服务器响应请求时，会通过Last-ModifiedHTTP头告诉浏览器资源的最后修改时间，浏览器本地对资源缓存起来，之后再请求的时候，会带上一个HTTP头If-Modified-Since，这个值就是服务器上一次给的Last-Modified的时间，服务器会拿着浏览器传过来的时间比对资源当前最后的修改时间，如果大于If-Modified-Since，则说明资源修改过了，浏览器不能再使用缓存，服务器重新一份完整的资源浏览器，否则浏览器可以继续使用缓存，并返回304状态码</li><li>Etag / If-None-Match（优先级高于Last-Modified / If-Modified-Since） 服务器响应请求时，通过EtagHTTP头部告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定），浏览器再次请求时，就会带上一个头If-None-Match，这个值就是服务器上一次给的Etag的值，服务器比对一下资源当前的Etag是否跟If-None-Match一致，不一致则说明资源修改过了，浏览器不能再使用缓存，否则浏览器可以继续使用缓存，并返回304状态码</li></ol><h1 id="http-常见的请求头以及响应头" tabindex="-1">HTTP 常见的请求头以及响应头 <a class="header-anchor" href="#http-常见的请求头以及响应头" aria-label="Permalink to &quot;HTTP 常见的请求头以及响应头&quot;">​</a></h1><p>常见请求字段如下表</p><table tabindex="0"><thead><tr><th>字段名</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td>Accept</td><td>能够接受的回应内容类型（Content-Types）</td><td>Accept: text/plain</td></tr><tr><td>Accept-Charset</td><td>能够接受的字符集</td><td>Accept-Charset: utf-8</td></tr><tr><td>Accept-Encoding</td><td>能够接受的编码方式列表</td><td>Accept-Encoding: gzip, deflate</td></tr><tr><td>Accept-Language</td><td>能够接受的回应内容的自然语言列表</td><td>Accept-Language: en-US</td></tr><tr><td>Authorization</td><td>用于超文本传输协议的认证的认证信息</td><td>Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==</td></tr><tr><td>Cache-Control</td><td>用来指定在这次的请求/响应链中的所有缓存机制 都必须 遵守的指令</td><td>Cache-Control: no-cache</td></tr><tr><td>Connection</td><td>该浏览器想要优先使用的连接类型</td><td>Connection: keep-alive Connection: Upgrade</td></tr><tr><td>Cookie</td><td>服务器通过 Set- Cookie （下文详述）发送的一个 超文本传输协议Cookie</td><td>Cookie: $Version=1; Skin=new;</td></tr><tr><td>Content-Length</td><td>以 八位字节数组 （8位的字节）表示的请求体的长度</td><td>Content-Length: 348</td></tr><tr><td>Content-Type</td><td>请求体的 多媒体类型</td><td>Content-Type: application/x-www-form-urlencoded</td></tr><tr><td>Date</td><td>发送该消息的日期和时间</td><td>Date: Tue, 15 Nov 1994 08:12:31 GMT</td></tr><tr><td>Expect</td><td>表明客户端要求服务器做出特定的行为</td><td>Expect: 100-continue</td></tr><tr><td>Host</td><td>服务器的域名(用于虚拟主机 )，以及服务器所监听的传输控制协议端口号</td><td>Content-Type: application/x-www-form-urlencoded</td></tr><tr><td>If-Match</td><td>仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要作用时，用作像 PUT 这样的方法中，仅当从用户上次更新某个资源以来，该资源未被修改的情况下，才更新该资源</td><td>If-Match: &quot;737060cd8c284d8af7ad3082f209582d&quot;</td></tr><tr><td>If-Modified-Since</td><td>允许在对应的内容未被修改的情况下返回304未修改</td><td>If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT</td></tr><tr><td>If-Range</td><td>如果该实体未被修改过，则向我发送我所缺少的那一个或多个部分；否则，发送整个新的实体</td><td>If-Range: &quot;737060cd8c284d8af7ad3082f209582d&quot;</td></tr><tr><td>Range</td><td>仅请求某个实体的一部分</td><td>Range: bytes=500-999</td></tr><tr><td>User-Agent</td><td>浏览器的浏览器身份标识字符串</td><td>User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0</td></tr><tr><td>Origin</td><td>发起一个针对 跨来源资源共享 的请求</td><td>Origin: <a href="http://www.example-social-network.com" target="_blank" rel="noreferrer">http://www.example-social-network.com</a></td></tr></tbody></table><p>常见http响应头</p><table tabindex="0"><thead><tr><th>字段名</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td>Cache-Control</td><td>强制缓存失效规则</td><td>cache-control: public, max-age=31536000</td></tr><tr><td>Content-Type</td><td>资源文件的类型</td><td>Content-Type：text/html;charset=UTF-8</td></tr><tr><td>Content-Encoding</td><td>资源编码规则</td><td>Content-Encoding:gzip</td></tr><tr><td>Date</td><td>服务端发送资源时的服务器时间</td><td>Date: Tue, 03 Apr 2018 03:52:28 GMT</td></tr><tr><td>Server</td><td>服务器和相对应的版本</td><td>Server：Tengine/1.4.6</td></tr><tr><td>Transfer-Encoding</td><td>发送的资源的方式</td><td>Transfer-Encoding：chunked</td></tr><tr><td>Expires</td><td>强制缓存失效规则</td><td>Expires:Sun, 1 Jan 2000 01:00:00 GMT</td></tr><tr><td>Last-Modified</td><td>协商缓存，资源最后修改日期</td><td>Last-Modified: Dec, 26 Dec 2015 17:30:00 GMT</td></tr><tr><td>Connection</td><td>服务器的连接类型</td><td>Connection：keep-alive</td></tr><tr><td>Etag</td><td>协商缓存，ETag标志</td><td>ETag: &quot;737060cd8c284d8af7ad3082f209582d&quot;</td></tr><tr><td>Refresh</td><td>用于重定向，或者当一个新的资源被创建时。默认会在5秒后刷新重定向。</td><td>Refresh: 5; url=<a href="http://baidu.com" target="_blank" rel="noreferrer">http://baidu.com</a></td></tr><tr><td>Access-Control-Allow-Origin</td><td>允许跨域请求来源</td><td>Access-Control-Allow-Origin: www.baidu.com</td></tr><tr><td>Access-Control-Allow-Methods</td><td>允许跨域请求的方法</td><td>Access-Control-Allow-Methods：GET,POST,PUT,DELETE</td></tr><tr><td>Access-Control-Allow-Credentials</td><td>是否允许发送cookie</td><td>Access-Control-Allow-Credentials: true</td></tr><tr><td>Content-Range</td><td>---</td><td>Content-Range: bytes 0-5/7877</td></tr></tbody></table><h1 id="http-响应码" tabindex="-1">HTTP 响应码 <a class="header-anchor" href="#http-响应码" aria-label="Permalink to &quot;HTTP 响应码&quot;">​</a></h1><table tabindex="0"><thead><tr><th>分类</th><th>分类描述</th></tr></thead><tbody><tr><td>1**</td><td>信息，服务器收到请求，需要请求者继续执行操作</td></tr><tr><td>2**</td><td>成功，操作被成功接收并处理</td></tr><tr><td>3**</td><td>重定向，需要进一步的操作以完成请求</td></tr><tr><td>4**</td><td>客户端错误，请求包含语法错误或无法完成请求</td></tr><tr><td>5**</td><td>服务器错误，服务器在处理请求的过程中发生了错误</td></tr></tbody></table><table tabindex="0"><thead><tr><th>状态码</th><th>状态码英文名称</th><th>中文描述</th></tr></thead><tbody><tr><td>100</td><td>Continue</td><td>客户端应继续其请求</td></tr><tr><td>101</td><td>Continue</td><td>切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议</td></tr><tr><td>200</td><td>OK</td><td>请求成功。一般用于GET与POST请求</td></tr><tr><td>201</td><td>Created</td><td>已创建。成功请求并创建了新的资源</td></tr><tr><td>202</td><td>Accepted</td><td>已接受。已经接受请求，但未处理完成</td></tr><tr><td>203</td><td>Non-Authoritative Information</td><td>非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本</td></tr><tr><td>204</td><td>No Content</td><td>请求成功，服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档</td></tr><tr><td>205</td><td>Reset Content</td><td>置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域</td></tr><tr><td>206</td><td>Partial Content</td><td>客户端请求一部分资源，服务器成功处理了部分GET请求， 返回一部分内容。 该状态码通常用于在进行大文件下载或者文件分段传时务器实现断点续传功能。</td></tr><tr><td>300</td><td>Multiple Choices</td><td>种选择。针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。</td></tr><tr><td>301</td><td>Moved Permanently</td><td>永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替</td></tr><tr><td>302</td><td>Found</td><td>临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI</td></tr><tr><td>303</td><td>See Other</td><td>查看其它地址。与301类似。使用GET和POST请求查看</td></tr><tr><td>304</td><td>Not Modified</td><td>未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源</td></tr><tr><td>305</td><td>Use Proxy</td><td>使用代理。所请求的资源必须通过代理访问</td></tr><tr><td>306</td><td>Unused</td><td>已经被废弃的HTTP状态码</td></tr><tr><td>307</td><td>Temporary Redirect</td><td>临时重定向。与302类似。使用GET请求重定向</td></tr><tr><td>400</td><td>Bad Request</td><td>客户端请求的语法错误，服务器无法理解</td></tr><tr><td>401</td><td>Unauthorized</td><td>认证失败,请求要求用户的身份认证</td></tr><tr><td>402</td><td>Payment Required</td><td>保留，将来使用</td></tr><tr><td>403</td><td>Forbidden</td><td>权限受限,服务器理解请求客户端的请求，但是拒绝执行此请求</td></tr><tr><td>404</td><td>Not Found</td><td>服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置&quot;您所请求的资源无法找到&quot;的个性页面</td></tr><tr><td>405</td><td>Method Not Allowed</td><td>客户端请求中的方法被禁止</td></tr><tr><td>406</td><td>Not Acceptable</td><td>服务器无法根据客户端请求的内容特性完成请求</td></tr><tr><td>407</td><td>Proxy Authentication Required</td><td>求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权</td></tr><tr><td>408</td><td>Request Time-out</td><td>服务器等待客户端发送的请求时间过长，超时</td></tr><tr><td>409</td><td>Conflict</td><td>服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突</td></tr><tr><td>410</td><td>Gone</td><td>客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置</td></tr><tr><td>411</td><td>Length Required</td><td>服务器无法处理客户端发送的不带Content-Length的请求信息</td></tr><tr><td>412</td><td>Precondition Failed</td><td>客户端请求信息的先决条件错误</td></tr><tr><td>413</td><td>Request Entity Too Large</td><td>于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息</td></tr><tr><td>414</td><td>Request-URI Too Large</td><td>请求的URI过长（URI通常为网址），服务器无法处理</td></tr><tr><td>415</td><td>Unsupported Media Type</td><td>服务器无法处理请求附带的媒体格式</td></tr><tr><td>416</td><td>Requested range not satisfiable</td><td>客户端请求的范围无效</td></tr><tr><td>417</td><td>Expectation Failed</td><td>服务器无法满足Expect的请求头信息</td></tr><tr><td>499</td><td>client has closed connection</td><td>客户端发起请求后，一段时间内没有收到代理服务器的应答，导致连接失败(很有可能是因为服务器端处理的时间过长，客户端“不耐)</td></tr><tr><td>500</td><td>Internal Server Error</td><td>服务器内部错误，无法完成请求</td></tr><tr><td>501</td><td>Not Implemented</td><td>服务器不支持请求的功能，无法完成请求</td></tr><tr><td>502</td><td>Bad Gateway</td><td>错误网关，作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应</td></tr><tr><td>503</td><td>Service Unavailable</td><td>服务不可用，由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中</td></tr><tr><td>504</td><td>Gateway Time-out</td><td>网关超时，充当网关或代理的服务器，未及时从远端服务器获取请求</td></tr><tr><td>505</td><td>HTTP Version not supported</td><td>HTTP 版本不受支持，服务器不支持请求的HTTP协议的版本，无法完成处理</td></tr></tbody></table><h1 id="键入网址到网页显示-期间发生了什么" tabindex="-1">键入网址到网页显示，期间发生了什么？ <a class="header-anchor" href="#键入网址到网页显示-期间发生了什么" aria-label="Permalink to &quot;键入网址到网页显示，期间发生了什么？&quot;">​</a></h1><h1 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h1><ol><li>5分钟看懂系列：HTTP缓存机制详解 <a href="https://segmentfault.com/a/1190000021716418" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000021716418</a></li><li>面试官：说说 HTTP 常见的请求头有哪些? 作用？ <a href="https://vue3js.cn/interview/http/headers.html" target="_blank" rel="noreferrer">https://vue3js.cn/interview/http/headers.html</a></li><li>关于常用的http请求头以及响应头详解 <a href="https://juejin.cn/post/6844903745004765198" target="_blank" rel="noreferrer">https://juejin.cn/post/6844903745004765198</a></li><li>图解网络: <a href="https://xiaolincoding.com/network/" target="_blank" rel="noreferrer">https://xiaolincoding.com/network/</a></li><li>http状态码: <a href="https://blog.csdn.net/m0_57053326/article/details/120580865" target="_blank" rel="noreferrer">https://blog.csdn.net/m0_57053326/article/details/120580865</a></li><li>HTTP断点续传 <a href="https://blog.csdn.net/LU_ZHAO/article/details/104744996" target="_blank" rel="noreferrer">https://blog.csdn.net/LU_ZHAO/article/details/104744996</a></li><li>3xx状态码 <a href="https://jelly.jd.com/article/6006b1035b6c6a01506c8791" target="_blank" rel="noreferrer">https://jelly.jd.com/article/6006b1035b6c6a01506c8791</a></li><li>Nest中的HttpException <a href="https://www.nonhana.xyz/2024/04/12/nest-notes/%E8%AF%A6%E8%A7%A3nest%E4%B8%AD%E7%9A%84%E5%BC%82%E5%B8%B8%EF%BC%88httpexception%EF%BC%89/" target="_blank" rel="noreferrer">https://www.nonhana.xyz/2024/04/12/nest-notes/详解nest中的异常（httpexception）/</a></li></ol>',23)]))}const b=d(l,[["render",c]]);export{u as __pageData,b as default};
