class IA {
    constructor(jogadorAtual, nivel) {
        this.jogadorAtual = jogadorAtual;
        this.nivelMax = nivel ? nivel : 3;
        this.saida = ""
    }    

    getRelatorioIa(){
        return this.saida
    }

    // Retorna o movimento da IA
    movimento(tabuleiro) {
        this.visitados = 0;
        this.saida = ''
        // Chama a minimax passando o tabuleiro, o nível atual, o jogador, 
        // o nível máximo de que irá aprofundar na busca
        // parâmetros iniciais para poda alpha e beta
        var movimentoProximo = this.minimax(tabuleiro, 0, this.jogadorAtual, this.nivelMax,  -100000, 100000);
        console.log("Total de nós: " + this.visitados);
        this.saida += `foram visitado ${this.visitados} posições</p>
        <p>com possibilidade de movimentos</p>
        <p>O movimento escolhido foi na coluna ${movimentoProximo.x + 1} e linha 
            ${movimentoProximo.y + 1}, pois obteve um score de ${movimentoProximo.score} pontos</p>`
        
        // Retorna o melhor movimento
        return movimentoProximo;
    }

    // Função MiniMax
    minimax(tabuleiro, nivel, jogadorAtual, nivelMax, alpha, beta) {
        this.visitados++;
        var novoTabuleiro, score, movimento;
        var melhorMovimento;
        var movimentos = tabuleiro.getMovimentosValidos(jogadorAtual);
        this.MovPoss=movimentos.length

        console.log("chamada nivel " + nivel + " para jogador " + jogadorAtual, movimentos);

        // Se atingir o nível máximo ou acabar os movimentos retorna o valor do movimento
        if (nivel >= nivelMax || movimentos.length === 0) {
            var he = this.mobility(tabuleiro, jogadorAtual);
            return he;
        }

        // Se o jogador for IA maximiza, se não minimiza
        if (jogadorAtual === this.jogadorAtual) {
            
            // Maximize
            // para cada movimento válido
            for (var i = movimentos.length - 1; i >= 0; i--) {
                movimento = movimentos[i];
                // guarda o estado atual do tabuleiro
                novoTabuleiro = tabuleiro.copy();
                this.doMovimento(novoTabuleiro, movimento, jogadorAtual);
                // Chama recursivamente o minimax aumentando um nível de profundeza com tabuleiro modificado
                score = this.minimax(novoTabuleiro, (nivel + 1), (jogadorAtual ? 0 : 1), nivelMax, alpha, beta);
                // Adiciona a pontuação do movimento
                movimento.score = score;

                // Se o movimento tiver uma pontuação melhor que o valor de alpha, esse é o novo melhorMovimento
                if (score > alpha) {
                    alpha = score;
                    melhorMovimento = movimento;
                    
                }

                // Caso o movimento tenha pontuação inferior já realiza a poda
                if (beta <= alpha) {
                    break;
                }
            }

            // retorna o score do melhor movimento atual
            if (nivel === 0) {
                return melhorMovimento;
            } else {
                return alpha;
            }

        } else {
            // Minimize
            var min = 100000;

            // Para todos os movimentos válidos
            for (var i = movimentos.length - 1; i >= 0; i--) {
                movimento = movimentos[i];
                // copia o estado atual
                novoTabuleiro = tabuleiro.copy();
                // Simula a jogada
                this.doMovimento(novoTabuleiro, movimento, jogadorAtual);
                // Chama recursivamente o minimax aumentando um nível de profundeza com tabuleiro modificado
                score = this.minimax(novoTabuleiro, (nivel + 1), (jogadorAtual ? 0 : 1), nivelMax, alpha, beta);
                // Se o movimento tiver uma pontuação inferior, passa a ser o movimento escolhido
                if (score < beta) {
                    beta = score;
                }

                // Se não, já realiza a poda
                if (beta <= alpha) {
                    break;
                }
            }
            return beta;
        }
    }

    // Simula a jogada
    doMovimento(tabuleiro, movimento, jogadorAtual) {
        tabuleiro.flip(movimento.x, movimento.y, jogadorAtual);
    }

    // Mobilidade
    mobility(tabuleiro, jogadorAtual) {
        var aiMovimentos = tabuleiro.getMovimentosValidos(jogadorAtual).length;
        var oppMovimentos = tabuleiro.getMovimentosValidos(jogadorAtual ? 0 : 1).length;

        let y = Math.ceil((oppMovimentos + aiMovimentos) === 0 ? 0 : 100 * ((aiMovimentos - oppMovimentos) / (aiMovimentos + oppMovimentos)));

        console.log('y ',y)
        return(y)
    }
}
  



  