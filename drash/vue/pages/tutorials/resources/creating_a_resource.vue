<script>
export const resource = {
  paths: ["/tutorials/resources/creating-a-resource"],
  meta: {
    title: "Creating A Resource",
    source_code_uri: "/tutorials/resources/creating_a_resource"
  }
}

export default {
  data() {
    return {
      example_code: this.$example_code['drash/example_code/tutorials/resources/creating_a_resource'],
      toc: {
        items: [
          "Before You Get Started",
          "Creating A Resource",
          "Path Params",
          "Optional Path Params",
          "Regular Expression URIs",
        ]
      }
    };
  },
}
</script>

<template lang="pug">
page-tutorial(
  :toc="toc"
)
    div.row
      div.col
        hr
        h2-hash Before You Get Started
        p Drash defines resources according to the MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web" target="_BLANK">https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web</a>
        p Unlike most other frameworks, Drash uses resource classes to handle requests and send responses. So, instead of defining a route with a specific HTTP method (e.g., <code>app.get()</code>), creating a controller class, and mapping that controller class to that route; you create a resource class, define its routes in its <code>paths</code> property, and define its HTTP methods as <code>public</code> functions.
        p You create a resource by extending the <code>Drash.Http.Resource</code> class. This is the base class for all resources. You can define your own base resource class, but it MUST extend the <code>Drash.Http.Resource</code> class.
        p Drash servers only register resources that are specified in their <code>resources</code> config during creation. See below. In the below example, the <code>HomeResource</code> class is the only resource that will be regisrered by the server.
        p
          code-block-slotted(:header="false" language="typescript" line_highlight="6")
            template(v-slot:code) {{ example_code.registering_resources.contents }}
        p When Drash servers register resources, they also register their paths as accessible URIs. An accessible URI is a URI that a client can target. Any URI that does not exist in any resource is a non-accessible URI. Non-accessible URIs ultimately lead to a response other than a <code>200 OK</code> repsonse. The default response for a request to a non-accessible URI is a <code>404 Not Found</code> error.
        p Adding resources is as simple as importing the resource and adding it to the <code>resources</code> config. See below. The <code>UsersResource</code> class is imported and added to the <code>resources</code> config.
        p
          code-block-slotted(:header="false" language="typescript" line_highlight="4,9")
            template(v-slot:code) {{ example_code.adding_resources.contents }}
        p-view-source-code(:source_code_uri="$route.meta.source_code_uri")
    div.row
      div.col
        hr
        h2-hash Creating A Resource
        p Take the example below. This resource handles requests at the <code>/</code> URI. If a client makes a request to this URI, this resource would handle that request.
        p
          code-block-slotted(language="typescript")
            template(v-slot:title) /path/to/your/project/home_resource.ts
            template(v-slot:code) {{ example_code.home_resource_get_post.contents }}
        h3 Adding More HTTP Methods
        p Giving a resource the ability to handle diffrent types of requests is as easy as adding the HTTP method to handle that request. Taking the above code, you can add more HTTP methods like the ones highlighted below; and your resource would be able to handle those requests.
        p
          code-block-slotted(language="typescript" line_highlight="16-24")
            template(v-slot:title) /path/to/your/project/home_resource.ts
            template(v-slot:code) {{ example_code.home_resource_get_post_put_delete.contents }}
        p As you can see, the HTTP methods you add and make <code>public</code> in a resource are the HTTP methods clients are allowed to call. If a client tries to make a <code>PATCH</code> request to this resource, it would receive a <code>405 Method Not Allowed</code> error as a response because this resource does not have <code>public PATCH() { ... }</code> defined.
    div.row
      div.col
        hr
        h2-hash Path Params
        p Resources are able to specify path params in their paths to allow them to cover multiple endpoints.
        p
          code-block-slotted(language="typescript" line_highlight="5")
            template(v-slot:title) /path/to/your/project/home_resource.ts
            template(v-slot:code) {{ example_code.home_resource_path_params.contents }}
        p Examples of URIs that this resource would handle:
        ul
          li
            request(method="get" url="/hello")
            | Responds with: Get request received! You passed in the following path param: hello
          li
            request(method="get" url="/world")
            | Responds with: Get request received! You passed in the following path param: world
          li
            request(method="get" url="/something")
            | Responds with: Get request received! You passed in the following path param: something
    div.row
      div.col
        hr
        h2-hash Optional Path Params
        p Path parameters can also be optional, allowing a resource to accept a URI that doesn't depend on certain parameters, but still wishes to accept the request, with or without them.
        p
          code-block-slotted(language="typescript" line_highlight="5")
            template(v-slot:title) /path/to/your/project/users_resource.ts
            template(v-slot:code) {{ example_code.users_resource_optional_path_params.contents}}
        p You can have as many optional parameters as you wish, but required parameters must precede optional parameters.
        P Examples of URIs that this resource would handle:
        ul
          li
            request(method="get" url="/users/1")
            | Responds with: Get request received! You passed in the following path params: |1||||
          li
            request(method="get" url="/users/1/")
            | Responds with: Get request received! You passed in the following path params: |1||||
          li
            request(method="get" url="/users/1/John")
            | Responds with: Get request received! You passed in the following path params: |1|John|||
          li
            request(method="get" url="/users/1/John/")
            | Responds with: Get request received! You passed in the following path params: |1|John|||
          li
            request(method="get" url="/users/1/John/54")
            | Responds with: Get request received! You passed in the following path params: |1|John|54||
          li
            request(method="get" url="/users/1/John/54/")
            | Responds with: Get request received! You passed in the following path params: |1|John|54||
          li
            request(method="get" url="/users/1/John/54/UK")
            | Responds with: Get request received! You passed in the following path params: |1|John|54|UK|
          li
            request(method="get" url="/users/1/John/54/UK/")
            | Responds with: Get request received! You passed in the following path params: |1|John|54|UK|
    div.row
      div.col
        hr
        h2-hash Regular Expression URIs
        p Resources are able to specify regular expressions in their paths to allow them to cover multiple endpoints.
        p
          code-block-slotted(language="typescript" line_highlight="5")
            template(v-slot:title) /path/to/your/project/home_resource.ts
            template(v-slot:code) {{ example_code.home_resource_regular_expression.contents }}
        p Examples of URIs that this resource would handle:
        ul
          li
            request(method="get" url="/1")
          li
            request(method="get" url="/2")
          li
            request(method="get" url="/3")
          li
            request(method="get" url="/9")
        p This resource would not handle the following URIs because they do not match the regular expression:
        ul
          li
            request(method="get" url="/11")
          li
            request(method="get" url="/12")
          li
            request(method="get" url="/13")
          li
            request(method="get" url="/99")
</template>
