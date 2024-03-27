const SEPARADOR = '$_$';

export class ChaveComposta {
  constructor() {}

  public static obterChaveComposta(chave: Map<string, any>): string {
    let chaveComposta = '';
    chave.forEach((item) => {
      chaveComposta += `${item}${SEPARADOR}`;
    });

    if (chaveComposta) {
      chaveComposta = chaveComposta.substring(
        0,
        chaveComposta.length - SEPARADOR.length
      );
    }

    return chaveComposta;
  }
}
