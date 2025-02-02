import{_ as i,c as s,aO as e,o as t}from"./chunks/framework.DEWO2zTc.js";const l="/blogBuild/memory/jsMemoryAllocation.png",n="/blogBuild/memory/marker_and_sweep.png",r="/blogBuild/memory/marker_and_sweep2.png",m=JSON.parse('{"title":"js内存管理","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge/jsFundation/memory/index.md","filePath":"knowledge/jsFundation/memory/index.md"}'),h={name:"knowledge/jsFundation/memory/index.md"};function o(p,a,k,d,c,g){return t(),s("div",null,a[0]||(a[0]=[e(`<h1 id="js内存管理" tabindex="-1">js内存管理 <a class="header-anchor" href="#js内存管理" aria-label="Permalink to &quot;js内存管理&quot;">​</a></h1><p>在javascript中，当我们创建变量时，系统会给对象自动分配对应的内存空间以及闲置资源回收。 基本数据类型存储在内存中，引用数据存储在堆内存中。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在栈中给数值变量分配空间</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;shier&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, age:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;12&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在堆内存中给引用数据分配空间</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Obj引用数据的引用发生变化，指向另一块存储区域</span></span></code></pre></div><p><img src="`+l+'" alt="An image"></p><h1 id="js垃圾回收策略" tabindex="-1">js垃圾回收策略 <a class="header-anchor" href="#js垃圾回收策略" aria-label="Permalink to &quot;js垃圾回收策略&quot;">​</a></h1><h3 id="引用计数法" tabindex="-1">引用计数法 <a class="header-anchor" href="#引用计数法" aria-label="Permalink to &quot;引用计数法&quot;">​</a></h3><p>记录内存空间被引用次数。当引用次数为0时， 将其作为垃圾可以被回收。</p><ol><li>当其被引用后，值的引用数增加1。</li><li>当保存该值的变量被其他值覆盖，或者设置为null时，其引用减少1。</li></ol><h3 id="标记清除-标记整理" tabindex="-1">标记清除，标记整理 <a class="header-anchor" href="#标记清除-标记整理" aria-label="Permalink to &quot;标记清除，标记整理&quot;">​</a></h3><h4 id="可达性" tabindex="-1">可达性 <a class="header-anchor" href="#可达性" aria-label="Permalink to &quot;可达性&quot;">​</a></h4><p>当对象是可达状态时，它一定是存在于内存中的。&quot;可达性&quot;。 根对象(roots):</p><ol><li>当前执行的函数，它的局部变量和参数。</li><li>当前嵌套调用链上的其他函数、它们的局部变量和参数。(闭包)</li><li>全局变量。 如果一个值可以从根通过引用或者引用链进行访问，则认为该值是可达的。 标记清除和整理</li><li>标记 从根节点遍历为每个可以访问到的对象都打上一个标记，表示该对象可达。 <img src="'+n+'" alt="An image"></li><li>清除 若没有被标记认为是不可达对象。清除所有不可达对象占用的内存。</li><li>整理 整理阶段是先将被引用的对象移动到一端，然后清理掉标记的内存。 <img src="'+r+'" alt="An image"></li></ol><h1 id="v8对gc的优化" tabindex="-1">V8对GC的优化 <a class="header-anchor" href="#v8对gc的优化" aria-label="Permalink to &quot;V8对GC的优化&quot;">​</a></h1><h3 id="分代式垃圾回收" tabindex="-1">分代式垃圾回收 <a class="header-anchor" href="#分代式垃圾回收" aria-label="Permalink to &quot;分代式垃圾回收&quot;">​</a></h3><h4 id="新生代回收" tabindex="-1">新生代回收 <a class="header-anchor" href="#新生代回收" aria-label="Permalink to &quot;新生代回收&quot;">​</a></h4><h4 id="老生代回收" tabindex="-1">老生代回收 <a class="header-anchor" href="#老生代回收" aria-label="Permalink to &quot;老生代回收&quot;">​</a></h4><h1 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to &quot;参考文献&quot;">​</a></h1><ol><li>js垃圾回收机制 <a href="https://blog.csdn.net/qq_41645323/article/details/143141272" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_41645323/article/details/143141272</a></li><li>谈谈js的垃圾回收机制 <a href="https://blog.csdn.net/XH_jing/article/details/142496628" target="_blank" rel="noreferrer">https://blog.csdn.net/XH_jing/article/details/142496628</a></li><li>JavaScript-垃圾回收机制 (GC) <a href="https://blog.csdn.net/qq_42543177/article/details/124644363" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_42543177/article/details/124644363</a></li><li>垃圾回收 <a href="https://zh.javascript.info/garbage-collection" target="_blank" rel="noreferrer">https://zh.javascript.info/garbage-collection</a></li></ol>',18)]))}const b=i(h,[["render",o]]);export{m as __pageData,b as default};
