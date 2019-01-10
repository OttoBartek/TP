reloadPage = (schema) => {
    document.cookie = "schema=" + schema;

    location.reload();
}