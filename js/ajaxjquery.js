function ajaxFetch(method, url, cb, options = null) {

    let data = null;
    let ct = "plain/text";
    if (options !== null) {
        if (options.header) {
            ct = options.header.value;
            data = options.data;
        }
    }

    const jqueryParameters = {}

    jqueryParameters.method = method;
    jqueryParameters.url = url;
    jqueryParameters.contentType = ct;
    jqueryParameters.data = data;

    $.ajax(jqueryParameters)
        .done(function (result, status, xhr) {
            cb(xhr)
        })
        .fail( function (xhr, status, error) {
            console.log("Error!!!", error)
            cb(xhr,'Error '+error);
        }  )

}