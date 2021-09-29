class Tabuleiro {
    constructor(jogadores, tamanho, existentTabuleiro) {
        this.size = tamanho;
        this.jogadores = jogadores;

        this.gerarTabuleiro();
        this.startTabuleiro(existentTabuleiro);
    }
    
    // Gera o tabuleiro sendo uma matriz do tamanho definido
    gerarTabuleiro() {

        var tabuleiro = [];

        // define todas as posições como nulas
        for (let x = 0; x < this.size; x++) {
            tabuleiro[x] = [];
            for (var y = 0; y < this.size; y++) {
                tabuleiro[x][y] = null;
            }
        }
        this.tabuleiro = tabuleiro;
    }

    // Se o tabuleiro não existe, cria o tabuleiro inicial
    startTabuleiro(existentTabuleiro) {
        if (existentTabuleiro) {
            this.tabuleiro = existentTabuleiro;
        } else {
            var floor = Math.round((this.size / 2) - 1);
            var round = Math.round((this.size / 2));


            this.tabuleiro[floor][floor] = this.jogadores[0].color;
            this.tabuleiro[round][round] = this.jogadores[0].color;
            this.tabuleiro[round][floor] = this.jogadores[1].color;
            this.tabuleiro[floor][round] = this.jogadores[1].color;
        }
    }

    // Busca jogadas passando o jogador atual e a posição
    searchUp(x, y, jogador) {
        var pecas = [];

        y--;
        while (y >= 0) {
            // Se acabou o tabuleiro, retorna
            if (!this.tabuleiro[x][y]) {
                return false;
            }

            // Verifica se a posição é referente a peça do jogador
            if (this.tabuleiro[x][y] === jogador.color) {
                if (pecas.length === 0) {
                    return false;

                // Caso seja retorna as peças que podem ser viradas
                } else {
                    console.log('buscando acima peças: ', pecas)
                    return pecas;
                }
            }
            // adiciona a posição da peca no array
            pecas.push({ x: x, y: y });
            y--;
        }

        return [];
    }

    // Busca abaixo
    searchDown(x, y, jogador) {
        var pecas = [];

        y++;
        while (y < this.size) {
            if (!this.tabuleiro[x][y]) {
                return false;
            }
            if (this.tabuleiro[x][y] === jogador.color) {
                if (pecas.length === 0) {
                    return false;
                } else {
                    return pecas;
                }
            }
            pecas.push({ x: x, y: y });
            y++;
        }

        return [];
    }

    // Busca a esquerda
    searchLeft(x, y, jogador) {
        var pecas = [];

        x--;
        while (x >= 0) {
            if (!this.tabuleiro[x][y]) {
                return false;
            }
            if (this.tabuleiro[x][y] === jogador.color) {
                if (pecas.length === 0) {
                    return false;
                } else {
                    return pecas;
                }
            }
            pecas.push({ x: x, y: y });
            x--;
        }

        return [];
    }

    // Busca a direita
    searchRight(x, y, jogador) {
        var pecas = [];

        x++;
        while (x < this.size) {
            if (!this.tabuleiro[x][y]) {
                return false;
            }
            if (this.tabuleiro[x][y] === jogador.color) {
                if (pecas.length === 0) {
                    return false;
                } else {
                    return pecas;
                }
            }
            pecas.push({ x: x, y: y });
            x++;
        }

        return [];
    }

    // Diagonal1
    searchUpLeft(x, y, jogador) {
        var pecas = [];

        x--;
        y--;
        while (x >= 0 && y >= 0) {
            if (!this.tabuleiro[x][y]) {
                return false;
            }
            if (this.tabuleiro[x][y] === jogador.color) {
                if (pecas.length === 0) {
                    return false;
                } else {
                    return pecas;
                }
            }
            pecas.push({ x: x, y: y });
            x--;
            y--;
        }

        return [];
    }

    // Diagonal2
    searchUpRight(x, y, jogador) {
        var pecas = [];

        x++;
        y--;
        while (x < this.size && y >= 0) {
            if (!this.tabuleiro[x][y]) {
                return false;
            }
            if (this.tabuleiro[x][y] === jogador.color) {
                if (pecas.length === 0) {
                    return false;
                } else {
                    return pecas;
                }
            }
            pecas.push({ x: x, y: y });
            x++;
            y--;
        }

        return [];
    }

    // Diagonal3
    searchDownLeft(x, y, jogador) {
        var pecas = [];

        x--;
        y++;
        while (x >= 0 && y < this.size) {
            if (!this.tabuleiro[x][y]) {
                return false;
            }
            if (this.tabuleiro[x][y] === jogador.color) {
                if (pecas.length === 0) {
                    return false;
                } else {
                    return pecas;
                }
            }
            pecas.push({ x: x, y: y });
            x--;
            y++;
        }

        return [];
    }

    // Diagonal4
    searchDownRight(x, y, jogador) {
        var pecas = [];

        x++;
        y++;
        while (x < this.size && y < this.size) {
            if (!this.tabuleiro[x][y]) {
                return false;
            }
            if (this.tabuleiro[x][y] === jogador.color) {
                if (pecas.length === 0) {
                    return false;
                } else {
                    return pecas;
                }
            }
            pecas.push({ x: x, y: y });
            x++;
            y++;
        }

        return [];
    }

    // Busca as peças do oponente
    getPecasOponente(x, y, jogador) {
        var pecas = [];

        // Se possui alguma cor retorna
        if (this.tabuleiro[x][y]) {
            return [];
        }

        // Verifica os movimentos válidos
        // adicionando no vetor de peças
        var up = this.searchUp(x, y, jogador);
        pecas = pecas.concat(up ? up : []);
        var down = this.searchDown(x, y, jogador);
        pecas = pecas.concat(down ? down : []);
        var left = this.searchLeft(x, y, jogador);
        pecas = pecas.concat(left ? left : []);
        var right = this.searchRight(x, y, jogador);
        pecas = pecas.concat(right ? right : []);
        var upLeft = this.searchUpLeft(x, y, jogador);
        pecas = pecas.concat(upLeft ? upLeft : []);
        var downLeft = this.searchDownLeft(x, y, jogador);
        pecas = pecas.concat(downLeft ? downLeft : []);
        var upRight = this.searchUpRight(x, y, jogador);
        pecas = pecas.concat(upRight ? upRight : []);
        var downRight = this.searchDownRight(x, y, jogador);
        pecas = pecas.concat(downRight ? downRight : []);

        return pecas;
    }

    // Cópia do tabuleiro
    copy() {
        var tempJogadores = [];
        for (var i = this.jogadores.length - 1; i >= 0; i--) {
            tempJogadores[i] = new Jogador(this.jogadores[i].name, this.jogadores[i].number, this.jogadores[i].isIa, this.jogadores[i].qtdPecas);
        };

        var tempTabuleiro = [];
        for (var i = 0; i < this.tabuleiro.length; i++) {
            tempTabuleiro[i] = this.tabuleiro[i].slice();
        }

        var copyTam = this.size;
        let tabCopy = new Tabuleiro(tempJogadores,copyTam, tempTabuleiro);
        return tabCopy;
    }

    // verifica se o movimento é válido, verificando se as peças no intervalo são do oponente
    movimentoValido(x, y, jogadorAtual) {
        var jogador = this.getJogador(jogadorAtual);

        return this.getPecasOponente(x, y, jogador).length !== 0;
    }

    // Cria uma lista com todos os movimentos válidos
    getMovimentosValidos(jogadorAtual) {
        var movimentoValidos = [];     
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                if (this.movimentoValido(x, y, jogadorAtual)) {
                    movimentoValidos.push({ x: x, y: y });
                }
            }
        }
        return movimentoValidos;
    }
    
    // virar as peças do intervalo
    flip(x, y, jogadorAtual) {
        var jogador = this.getJogador(jogadorAtual);
        var otherJogador = this.getJogador(jogadorAtual, true);

        var pecas = this.getPecasOponente(x, y, jogador);

        // Para cada peça no intervalo
        for (var i = 0; i < pecas.length; i++) {
            var piece = pecas[i];

            // altera a cor da peça
            this.tabuleiro[piece.x][piece.y] = jogador.color;
        }
        this.tabuleiro[x][y] = jogador.color;

        // altera a quantidade de peças
        jogador.qtdPecas += pecas.length + 1;
        otherJogador.qtdPecas -= pecas.length;
    }

    // Busca o jogador
    getJogador(jogadorAtual, opp) {
        var jogador;

        if (!opp) {
            jogador = this.jogadores[jogadorAtual];
        } else {
            jogador = this.jogadores[jogadorAtual ? 0 : 1];
        }

        return jogador;
    }
}
















