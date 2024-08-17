import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,b as n}from"./app-GC2pG_6p.js";const e={},t=n(`<p>在这一部分，我们将介绍如何搭建一个基本的 Register RAG pipeline。</p><p>Register RAG 使用 json 文件来进行整个 pipeline 的配置。目前，配置文件有四个部分：<code>embedding</code>、<code>store</code>、<code>generation</code> 和 <code>prompt</code>。其中，<code>prompt</code> 部分可以选择不配置。预计未来最少会加入两个模块：重排序（<code>rerank</code>）和网络搜索（<code>websearch</code>）。</p><h2 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置"><span>基本配置</span></a></h2><p>下面是一个基本的配置文件，我们将使用这个配置文件来搭建一个简单的 RAG pipeline。</p><div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  &quot;embedding&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;embedding_type&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;remote&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;embedding_model_name_or_path&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;xinference/bge-m3&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;embedding_remote_url&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;http://localhost:9997&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;embedding_model_preload&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#D19A66;">true</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  &quot;store&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;store_type&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;local&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;store_name&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;chroma&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;store_local_path&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;/path/to/chroma&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  },</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  &quot;generation&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;generation_type&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;remote&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;generation_model_name_or_path&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;xinference/qwen2-instruct&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;generation_remote_url&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;http://localhost:9997&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;generation_xinference_config&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      &quot;xinference_model_size&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;1_5&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      &quot;xinference_mdoel_quantization&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;4-bit&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="xinference-服务" tabindex="-1"><a class="header-anchor" href="#xinference-服务"><span>Xinference 服务</span></a></h2><p>如果你希望使用上面的配置搭建自己的 RAG pipeline,那么需要首先启动 <code>xinference</code> 服务。你可以访问<a href="https://inference.readthedocs.io/en/latest/index.html" target="_blank" rel="noopener noreferrer">xinference 文档</a>来获取更多信息。</p><p>在这个例子中，我们将使用 <code>docker</code> 来启动 <code>xinference</code> 服务。首先，我们需要拉取 <code>xinference</code> 镜像。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 国内用户可以使用下面的命令从阿里云拉取镜像</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pull</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> registry.cn-hangzhou.aliyuncs.com/xprobe_xinference/xinference:latest</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 或者也可以从 Docker Hub 拉取镜像</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pull</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> xprobe/xinference:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们需要确认已经安装了 NVIDIA 驱动和 NVIDIA Container Toolkit。NVIDIA Container Toolkit的文档可以在<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html" target="_blank" rel="noopener noreferrer">这里</a>找到。</p><p>最后，我们可以使用这条命令来启动 <code>xinference</code> 服务：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -e</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> XINFERENCE_MODEL_SRC=modelscope</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 9997:9997</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --gpus</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> all</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> xprobe/xinference:latest</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> xinference-local</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -H</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0.0.0.0</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --log-level</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debug</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>Note</strong>: <code>--gpus</code> 和 <code>-H</code> 参数必须设置,并且主机的 CUDA 版本必须大于等于 <code>12.4</code>。如果有多个 GPU,可以使用 <code>--gpus 0,1,2</code> 来制定所需要使用的 GPU。上述镜像只能在有 GPU 的机器上运行，如果需要使用 CPU 版本，可以前往<a href="https://inference.readthedocs.io/en/latest/getting_started/using_docker_image.html" target="_blank" rel="noopener noreferrer">xinference 文档</a>获取更多信息。</p><p>在启动 <code>xinference</code> 服务之后，可以访问 <code>http://localhost:9997</code> 来检查服务是否正常运行。</p><h2 id="pipeline" tabindex="-1"><a class="header-anchor" href="#pipeline"><span>Pipeline</span></a></h2><p>可以通过下面的代码来完成一个简单的 RAG pipeline。</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> asyncio</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> register_rag </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> Pipeline</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> register_rag.documents </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> Document</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> register_rag.documents.loader </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> PDFLoader</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> register_rag.documents.splitter </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> CharacterSplitter</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">async</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">():</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    pipeline </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;"> Pipeline</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;path/to/your/configuration.json&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    loader </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;"> PDFLoader</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;path/to/your/pdf&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    # 使用换行符分割文档</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    docs </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> await</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> loader.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">load_and_split</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">splitter</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">CharacterSplitter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()) </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    collection_name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;default&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    await</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.pipeline.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">add_docs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(docs, collection_name)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    # 生成回复</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    query </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;What is the capital of China?&quot;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> # 问题</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    top_k </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 5</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> # 召回的文档数量</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    return_related_docs </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> True</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> # 是否需要返回召回结果</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    response, related_docs </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> await</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> pipeline.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get_response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        query, collection_name, top_k, return_related_docs</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    )</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Response: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">response</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Related Docs: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">related_docs</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">asyncio.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">())</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),l=[t];function h(p,k){return a(),s("div",null,l)}const o=i(e,[["render",h],["__file","Quickstart.html.vue"]]),c=JSON.parse('{"path":"/zh/GetStarted/Quickstart.html","title":"快速入门","lang":"zh-CN","frontmatter":{"lang":"zh-CN","title":"快速入门","description":"如何快速使用 Register RAG","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://github.com/Charon-ops/RegisterRAG/RegisterRAG/GetStarted/Quickstart.html"}],["meta",{"property":"og:url","content":"https://github.com/Charon-ops/RegisterRAG/RegisterRAG/zh/GetStarted/Quickstart.html"}],["meta",{"property":"og:site_name","content":"Register RAG"}],["meta",{"property":"og:title","content":"快速入门"}],["meta",{"property":"og:description","content":"如何快速使用 Register RAG"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-08-16T03:00:47.000Z"}],["meta",{"property":"article:author","content":"JLULLM"}],["meta",{"property":"article:modified_time","content":"2024-08-16T03:00:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"快速入门\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-16T03:00:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"JLULLM\\",\\"email\\":\\"jlullm@163.com\\"}]}"]]},"headers":[{"level":2,"title":"基本配置","slug":"基本配置","link":"#基本配置","children":[]},{"level":2,"title":"Xinference 服务","slug":"xinference-服务","link":"#xinference-服务","children":[]},{"level":2,"title":"Pipeline","slug":"pipeline","link":"#pipeline","children":[]}],"git":{"createdTime":1723777247000,"updatedTime":1723777247000,"contributors":[{"name":"yumuzhihan","email":"1573252900@qq.com","commits":1}]},"readingTime":{"minutes":2.04,"words":612},"filePathRelative":"zh/GetStarted/Quickstart.md","localizedDate":"2024年8月16日","excerpt":"<p>在这一部分，我们将介绍如何搭建一个基本的 Register RAG pipeline。</p>\\n<p>Register RAG 使用 json 文件来进行整个 pipeline 的配置。目前，配置文件有四个部分：<code>embedding</code>、<code>store</code>、<code>generation</code> 和 <code>prompt</code>。其中，<code>prompt</code> 部分可以选择不配置。预计未来最少会加入两个模块：重排序（<code>rerank</code>）和网络搜索（<code>websearch</code>）。</p>"}');export{o as comp,c as data};