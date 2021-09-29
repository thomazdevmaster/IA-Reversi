class Jogador {
    constructor(name, number, isIa, nivel) {
        this.name = name;
        this.number = number;
        this.isIa = isIa;
        this.color = number === 0 ? "black" : "white";
        this.qtdPecas = 2;
        this.nivel = nivel;

        // Instancia IA
        if (this.isIa) {
            this.IA = new IA(this.number, this.nivel);
        }
    }

    // Analiza os movimentos somente se for IA
    getMovimento(tabuleiro) {
        return this.IA.movimento(tabuleiro);
    }

    getRelatorioIa () {
        return this.IA.getRelatorioIa();
    }
}

