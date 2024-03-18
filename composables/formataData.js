export function useData(){
    const formataDataBR = data => { new Date(data+"T00:00:00.0").toLocaleDateString("pt-BR") }
    const formataDataTimeBR = dataHora => { new Date(dataHora.replace("-", ",")).toLocaleDateString("pt-BR", {hour:  "2-digit", minute: "2-digit", second: "2-digit"}) }
    
    const formataMoedaReal = valor => {
        if (valor == undefined || valor == null) valor = 0;
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }

    return { formataDataBR, formataDataTimeBR, formataMoedaReal }
}