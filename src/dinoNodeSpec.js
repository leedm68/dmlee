export const dinos = ["brontosaurus", "stegosaurus", "triceratops",
               "tyrannosaurus", "pterodactyl"]

export const dinoNodeSpec = {
  // Dinosaurs have one attribute, their type, which must be one of
  // the types defined above.
  // Brontosaurs are still the default dino.
  attrs: {type: {default: "brontosaurus"}},
  inline: true,
  group: "inline",
  draggable: true,

  // These nodes are rendered as images with a `dino-type` attribute.
  // There are pictures for all dino types under /img/dino/.
  toDOM: node => ["img", {"dino-type": node.attrs.type,
                          src: "./images/" + node.attrs.type + ".png",
                          title: node.attrs.type,
                          class: "dinosaur"}],
  // When parsing, such an image, if its type matches one of the known
  // types, is converted to a dino node.
  parseDOM: [{
    tag: "img[dino-type]",
    getAttrs: dom => {
      let type = dom.getAttribute("dino-type")
      return dinos.indexOf(type) > -1 ? {type} : false
    }
  }]
}