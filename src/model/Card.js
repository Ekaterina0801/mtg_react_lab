class Card {

    constructor(cardDto) {
        this.name = cardDto.name;
        this.text = cardDto.text === undefined ? "" : cardDto.text;
        this.cmc = cardDto.cmc;
        this.imageUrl = cardDto.imageUrl === undefined ? "https://i.pinimg.com/736x/23/21/a4/2321a43caf04da1c40a0b7e2a82e4c74.jpg" : cardDto.imageUrl;
        this.colors = cardDto.colors === undefined ? new Array("C") : cardDto.colors;
        this.kind = cardDto.type;
        
        this.rules = this.#calcRules(cardDto);

        this.limit = this.#calcLimit();
    }

    #calcLimit() {
        if (String(this.kind).startsWith("Basic Land"))
            return Number.POSITIVE_INFINITY;
        if (this.rules.some((v, i) => v.startsWith("В колоде может быть любое количество карт с именами")))
            return Number.POSITIVE_INFINITY;
        return 4;
    }

    #calcRules(cardDto) {
        const res = new Array();
        this.text.split('\n').forEach(rule => {
            res.push(rule);
        });
        return res;
    }
}


export { Card }
