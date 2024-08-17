import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,b as a}from"./app-GC2pG_6p.js";const n={},t=a(`<p>生成组件负责根据 prompt 生成对应的回复。当给定一个用户提出的问题时，经过召回，需要将召回结果与用户的问题结合生成 prompt,这一部分由 <code>PromptGenerator</code> 负责，并不由生成组件负责。生成组件是一个 <code>Generator</code>，根据 <code>PromptGenerator</code> 生成的 prompt 生成回复。</p><h2 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置"><span>基本配置</span></a></h2><p>以下是 Python 中生成组件的配置：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> GenerationConfig</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">BaseModel</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    generation_type: Literal[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;local&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;remote&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    generation_model_name_or_path: Optional[</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> None</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    generation_model_preload: </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">bool</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> False</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    generation_model_device: </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;cpu&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    generation_remote_url: Optional[</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> None</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    generation_remote_token: Optional[</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> None</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    generation_xinference_config: Optional[XinferenceConfig] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> None</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>generation_type</code>: 生成组件的类型。可以是 <code>local</code> 或 <code>remote</code>。</li><li><code>generation_model_name_or_path</code>: 用于生成的模型的名称或路径。</li><li><code>generation_model_preload</code>: 是否在调用之前加载模型。</li><li><code>generation_model_device</code>: 用于生成的设备。可以是 <code>cpu</code> 或 <code>cuda</code>，也可以指定具体的 GPU 编号。</li><li><code>generation_remote_url</code>: 远程生成服务的 URL。仅当 <code>generation_type</code> 为 <code>remote</code> 时需要。</li><li><code>generation_remote_token</code>: 远程生成服务的 token。仅当 <code>generation_type</code> 为 <code>remote</code> 且服务需要 token 时需要。</li><li><code>generation_xinference_config</code>: Xinference 服务的配置。仅当 <code>generation_type</code> 为 <code>remote</code> 且使用 Xinference 服务时需要。</li></ul><h2 id="如何添加新的生成组件" tabindex="-1"><a class="header-anchor" href="#如何添加新的生成组件"><span>如何添加新的生成组件</span></a></h2><p>如果需要添加自定义的生成组件，需要继承 <code>Generator</code> 类，或者继承 <code>LocalGenerator</code>、<code>RemoteGenerator</code> 类，并实现抽象方法。抽象方法如下：</p><ul><li><p><code>generate</code>: 根据 prompt、system prompt 与历史消息生成回复。</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> async</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> generate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">      self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">      prompt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">      history</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;"> List[ResponseMessage] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> None</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">      system_prompt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> str</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> None</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ) -&gt; </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ResponseMessage</code> 定义如下：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ResponseMessage</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">TypedDict</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    content: </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">str</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    role: Literal[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;system&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;user&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;assistant&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="可用的生成组件" tabindex="-1"><a class="header-anchor" href="#可用的生成组件"><span>可用的生成组件</span></a></h2><ul><li><code>local</code>: <ul><li><code>TransformersGenerator</code>: 使用 Transformers 库进行本地生成的生成器。<code>model_name_or_path</code> 应配置为 <code>transformers/xxx</code>。</li></ul></li><li><code>remote</code>: <ul><li><code>OllamaGenerator</code>: 调用 Ollama 服务进行生成的生成器。<code>model_name_or_path</code> 应配置为 <code>ollama/xxx</code>。</li><li><code>XinfernceGenerator</code>: 调用 Xinference 服务进行生成的生成器。<code>model_name_or_path</code> 应配置为 <code>xinference/xxx</code>。</li></ul></li></ul>`,10),l=[t];function h(p,r){return e(),s("div",null,l)}const o=i(n,[["render",h],["__file","index.html.vue"]]),c=JSON.parse('{"path":"/zh/Guide/Generation/","title":"简介","lang":"zh-CN","frontmatter":{"lang":"zh-CN","title":"简介","description":"Register Rag 中生成组件的介绍","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://github.com/Charon-ops/RegisterRAG/RegisterRAG/Guide/Generation/"}],["meta",{"property":"og:url","content":"https://github.com/Charon-ops/RegisterRAG/RegisterRAG/zh/Guide/Generation/"}],["meta",{"property":"og:site_name","content":"Register RAG"}],["meta",{"property":"og:title","content":"简介"}],["meta",{"property":"og:description","content":"Register Rag 中生成组件的介绍"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-08-17T08:42:28.000Z"}],["meta",{"property":"article:author","content":"JLULLM"}],["meta",{"property":"article:modified_time","content":"2024-08-17T08:42:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"简介\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-17T08:42:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"JLULLM\\",\\"email\\":\\"jlullm@163.com\\"}]}"]]},"headers":[{"level":2,"title":"基本配置","slug":"基本配置","link":"#基本配置","children":[]},{"level":2,"title":"如何添加新的生成组件","slug":"如何添加新的生成组件","link":"#如何添加新的生成组件","children":[]},{"level":2,"title":"可用的生成组件","slug":"可用的生成组件","link":"#可用的生成组件","children":[]}],"git":{"createdTime":1723884148000,"updatedTime":1723884148000,"contributors":[{"name":"yumuzhihan","email":"1573252900@qq.com","commits":1}]},"readingTime":{"minutes":1.47,"words":442},"filePathRelative":"zh/Guide/Generation/README.md","localizedDate":"2024年8月17日","excerpt":"<p>生成组件负责根据 prompt 生成对应的回复。当给定一个用户提出的问题时，经过召回，需要将召回结果与用户的问题结合生成 prompt,这一部分由 <code>PromptGenerator</code> 负责，并不由生成组件负责。生成组件是一个 <code>Generator</code>，根据 <code>PromptGenerator</code> 生成的 prompt 生成回复。</p>\\n<h2>基本配置</h2>\\n<p>以下是 Python 中生成组件的配置：</p>\\n<div class=\\"language-python line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"python\\" data-title=\\"python\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">class</span><span style=\\"--shiki-light:#C18401;--shiki-dark:#E5C07B\\"> GenerationConfig</span><span style=\\"--shiki-light:#C18401;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#C18401;--shiki-dark:#E5C07B\\">BaseModel</span><span style=\\"--shiki-light:#C18401;--shiki-dark:#ABB2BF\\">)</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">:</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    generation_type: Literal[</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">\\"local\\"</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">\\"remote\\"</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    generation_model_name_or_path: Optional[</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">str</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">] </span><span style=\\"--shiki-light:#383A42;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> None</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    generation_model_preload: </span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">bool</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> False</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    generation_model_device: </span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">str</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> \\"cpu\\"</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    generation_remote_url: Optional[</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">str</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">] </span><span style=\\"--shiki-light:#383A42;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> None</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    generation_remote_token: Optional[</span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">str</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">] </span><span style=\\"--shiki-light:#383A42;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> None</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    generation_xinference_config: Optional[XinferenceConfig] </span><span style=\\"--shiki-light:#383A42;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> None</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{o as comp,c as data};