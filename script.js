async function LerArquivo(cnpj) {
try{
	const url = `https://minhareceita.org/${cnpj}`
	const respota = await fetch(url)
	const data = await respota.json()

	if (data.descricao_situacao_cadastral !== "ATIVA"){
		return data
	}
}catch(e){
	console.log(e)
}
}

const entradaArquivo = document.querySelector("#arquivo")
const tbody = document.querySelector("#tbody")


let i =1;
entradaArquivo.addEventListener('change',function(){
	const arquivo = this.files[0];
	const leitor = new FileReader();

	tbody.classList.remove("hidden");

	leitor.addEventListener('load', function(){
		const arqBusca = leitor.result
		const linhas = arqBusca.split(/\r?\n/);

		linhas.forEach(async function (cnpj) {
			const empresa = await LerArquivo(cnpj);
			
			const lista = [empresa.razao_social, empresa.cnpj ,empresa.descricao_situacao_cadastral,empresa.descricao_motivo_situacao_cadastral,empresa.data_situacao_cadastral]

			let tr = tbody.insertRow();

			let td_id = tr.insertCell();
			let td_empresa = tr.insertCell();
			let td_cnpj = tr.insertCell();
			let td_situacao = tr.insertCell();
			let td_motivo = tr.insertCell();
			let td_data = tr.insertCell();

			td_id.innerText = i++
			td_empresa.innerText = lista[0]
			td_cnpj.innerText = lista[1]
			td_situacao.innerText = lista[2]
			td_motivo.innerText = lista[3]
			td_data.innerText = lista[4]
			
		});
		
 	})

	if(arquivo){
		leitor.readAsText(arquivo);
	}

})