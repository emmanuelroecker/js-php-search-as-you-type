/**
 * Glicer Search Client Tests
 *
 * Typescript
 *
 * @category  GLICER
 * @author    Emmanuel ROECKER
 * @author    Rym BOUCHAGOUR
 * @copyright 2015 GLICER
 * @license   GNU 2
 * @link      http://dev.glicer.com/
 *
 * Created : 30/07/15
 * File : glsearch-test.ts
 *
 */
/// <reference path="qunit.d.ts" />
/// <reference path="../../src/glsearch.ts" />
test("remove diacritics characters", function () {
    var search = new glSearch("");
    var result = search.normalize("école");
    equal(result, "ecole");
    result = search.normalize("ça été un être chère cœur chez les zoulous");
    deepEqual(result, ["ca", "un", "ete", "les", "etre", "chez", "chere", "coeur", "zoulous"]);
    result = search.normalize('äâàéèëêïîöôùüûœç');
    deepEqual(result, ["aaaeeeeiioouuuoec"]);
    result = search.normalize("economi econo uni universel");
    deepEqual(result, ["economi", "universel"]);
});
test("to query", function () {
    var search = new glSearch("");
    var query = search.toQuery(["maison", "voiture"]);
    equal(query, "maison* voiture*");
});
test("highlights", function () {
    var search = new glSearch("");
    var data = { value: { field1: "j'aime le word1", field2: "je préfère le word25 qui est meilleur" }, highlights: "0 0 10 5 1 1 14 6" };
    search.highlights(["word1", "word2"], ["field1", "field2"], data);
    equal(data.value.field1, "j'aime le <b>word1</b>");
    equal(data.value.field2, "je préfère le <b>word2</b>5 qui est meilleur");
});
asyncTest("query on server", function () {
    var search = new glSearch("http://localhost:1349/search.php?q=");
    search.query("rest chaponnay", function (value) {
        equal(value.title, "Aklé - Le Comptoir à Mezzés");
        equal(value.tags, "<b>rest</b>aurant libanais monde");
        equal(value.address, "108 rue <b>Chaponnay</b>");
    }, function (values) {
    });
});
//# sourceMappingURL=glsearch-test.js.map