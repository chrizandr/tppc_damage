all_tags = document.getElementsByTagName("li")
for (let i = 0; i < all_tags.length; i++){
    var tag = all_tags[i]
    if (tag.children.length > 0){
        console.log(tag.children[0].text)
    }
}