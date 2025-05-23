// Defina os links dos relatórios no início
const links = {
	// Links das páginas
	"link01": "about:blank",
	"link02": "about:blank",
	"link03": "about:blank",
	"link04": "about:blank",
	"link05": "about:blank",
	
	// Sublinks das páginas
	"sublink01": "about:blank",
	"sublink02": "about:blank",
	"sublink03": "about:blank",
	"sublink04": "about:blank",
	
	// Links dos icons
	"link-icon01": "/files/files/1d749bbf-be71-4411-9fcf-f0d6ac368f76/content",
	"link-icon02": "/files/files/85e60962-98f0-4e7f-b3e5-da51916e49c8/content",
	"link-icon03": "/files/files/129658b7-e2dd-4fe2-842f-0b7ceae0bbc7/content",
	"link-icon04": "/files/files/2f5467aa-bbbf-4efc-a853-ee672fd6f3bd/content",
	"link-icon05": "/files/files/b83b7043-35a3-4819-9dff-70d670729404/content"
	
};

// Substituir os links dinâmicamente
document.addEventListener("DOMContentLoaded", function () {
	// Substituir os links dos relatórios no HTML
	const link01 = document.querySelector('a[href="&link01"]');
	const link02 = document.querySelector('a[href="&link02"]');
	const link03 = document.querySelector('a[href="&link03"]');
	const link04 = document.querySelector('a[href="&link04"]');
	const link05 = document.querySelector('a[href="&link05"]');
	const sublink01 = document.querySelector('a[href="&sublink01"]');
	const sublink02 = document.querySelector('a[href="&sublink02"]');
	const sublink03 = document.querySelector('a[href="&sublink03"]');
	const sublink04 = document.querySelector('a[href="&sublink04"]');
	const linkicon01 = document.querySelector('img[src="&link-icon01"]');
	const linkicon02 = document.querySelector('img[src="&link-icon02"]');
	const linkicon03 = document.querySelector('img[src="&link-icon03"]');
	const linkicon04 = document.querySelector('img[src="&link-icon04"]');
	const linkicon05 = document.querySelector('img[src="&link-icon05"]');
	
	// Diretamente altera os atributos
	link01.href = links["link01"];
	link02.href = links["link02"];
	link03.href = links["link03"];
	link04.href = links["link04"];
	link05.href = links["link05"];
	sublink01.href = links["sublink01"];
	sublink02.href = links["sublink02"];
	sublink03.href = links["sublink03"];
	sublink04.href = links["sublink04"];
	linkicon01.src = links["link-icon01"];
	linkicon02.src = links["link-icon02"];
	linkicon03.src = links["link-icon03"];
	linkicon04.src = links["link-icon04"];
	linkicon05.src = links["link-icon05"];
});

// Função para alternar o estado do menu lateral (aberto / colapsado)
function toggleMenu() {
	// Seleciona os elementos do menu lateral, ícone do menu e submenu
	const sidebar = document.getElementById('sidebar');
	const menuIcon = document.querySelector('.menu-icon');
	const isMobile = window.innerWidth <= 768;
	const dashboardSubmenu = document.getElementById("dashboard-submenu");
	const icon = document.getElementById("dashboard-icon");
	
	// Alterna entre abrir e fechar o menu conforme o dispositivo (mobile ou desktop)
	if (isMobile) {
		sidebar.classList.toggle('open');
	} else {
		sidebar.classList.toggle('collapsed');
	}
	
	// Alterna a classe 'rotated' no ícone do menu
	menuIcon.classList.toggle('rotated');
	
	// Sempre esconde o submenu ao alternar o menu principal
	dashboardSubmenu.style.display = "none";
	
}

// Verifica quando a tela é redimensionada
window.addEventListener('resize', function () {
	const sidebar = document.getElementById('sidebar');
	const isMobile = window.innerWidth <= 768;
	
	if (!isMobile) {
		sidebar.classList.remove('open');
		sidebar.classList.add('collapsed');
	}
});

// Função para alternar a exibição de um submenu
function toggleSubmenu(submenuId, iconId) {
	// Seleciona o submenu e o ícone correspondente
	const submenu = document.getElementById(submenuId);
	const icon = document.getElementById(iconId);
	
	// Verifica se o submenu está visível
	if (submenu.style.display === "block") {
		// Se estiver visível, oculta o submenu e altera o ícone para fechado
		submenu.style.display = "none";
		icon.src = "/files/files/b534d2bd-8be5-4eb0-8cc0-e82c359499ab/content";
	} else {
		// Se estiver oculto, exibe o submenu e altera o ícone para aberto
		submenu.style.display = "block";
		icon.src = "/files/files/828d9e9b-c7a7-4a19-873d-fffc204d0d12/content";
	}
}

// Seleciona todos os links dentro dos itens do submenu
document.addEventListener("DOMContentLoaded", function () {
	const submenuItems = document.querySelectorAll("#dashboard-submenu .menu-item a");
	
	// Adiciona um evento de clique para cada item do submenu 
	submenuItems.forEach(item => {
		item.addEventListener("click", function () {
			// Seleciona o submenu e o ícone do dashboard 
			const submenu = document.getElementById("dashboard-submenu");
			const icon = document.getElementById("dashboard-icon");
			
			// Oculta o submenu ao clicar em um item 
			submenu.style.display = "none";
			
			// Altera a imagem do ícone para representar que o submenu está fechado
			icon.src = "/files/files/b534d2bd-8be5-4eb0-8cc0-e82c359499ab/content";
		});
	});
});

// Seleciona as divs do menu principal e do submenu
document.addEventListener("DOMContentLoaded", function () {
	const dashboardMenu = document.getElementById("dashboard-menu");
	const dashboardSubmenu = document.getElementById("dashboard-submenu");
	const icon = document.getElementById("dashboard-icon");
	
	// Função que verifica se o menu principal NÃO está ativo, então esconde o submenu
	function checkSubmenuVisibility() {
		if (!dashboardMenu.classList.contains("active")) {
			dashboardSubmenu.style.display = "none";
			icon.src = "/files/files/4b4aacd1-e118-4143-81db-6d1328f684be/content";
		}
	}
	
	// Sempre que houver um clique na página, verifica a visibilidade do submenu
	document.addEventListener("click", function () {
		checkSubmenuVisibility();
	});
});

// Alterna a classe "active" no menu e atualiza o título
document.querySelectorAll(".menu-item").forEach(item => {
	item.addEventListener("click", function() {
		// Remove a classe "active" de todos os itens do menu 
		document.querySelectorAll(".menu-item").forEach(el => el.classList.remove("active"));
		
		// Adiciona a classe "active" ao item clicado  
		this.classList.add("active");
		
		// Verifica se o item pertence a um submenu 
		const isSubmenu = this.closest(".submenu");
		const titleText = this.querySelector("span").innerText;
		
		// Seleciona os elementos do título 
		const aggregation = document.getElementById('title-aggregation');
		const mainTitle = document.getElementById('main-title').innerText;
		
		// Atualiza o título de acordo com o menu selecionado
		if (isSubmenu) {
			const parentMenu = this.closest('.menu-item');
			const parentMenuText = parentMenu.querySelector("span").innerText;
			aggregation.innerText = `| Dashboard: ${titleText}`;
		} else {
			aggregation.innerText = `| ${titleText}`;
		}
		
		// Se o item contiver um link, dispara o clique automaticamente
		const link = this.querySelector("a");
		if (link) {
			link.click();
		}
	});
});

// Alterna o menu lateral no mobile
function toggleMobileMenu() {
	// Alterna a classe 'open' no menu lateral (sidebar) 
	document.getElementById('sidebar').classList.toggle('open');
	
	// Alterna a classe 'rotated' no botão do menu para indicar a ação
	document.querySelector('.menu-toggle').classList.toggle('rotated');
}

// Fecha o menu lateral no mobile ao clicar em um item
document.addEventListener("DOMContentLoaded", function () {
	// Seleciona todos os links dentro do menu
	const menuItems = document.querySelectorAll(".menu a");
	
	// Seleciona o elemento do menu que pode ser colapsado 
	const collapseMenu = document.querySelector(".collapse-menu");
	
	// Adiciona um evento de clique para cada link do menu
	menuItems.forEach(item => {
		item.addEventListener("click", function () {
			// Se a largura da tela for menor ou igual a 768px (mobile), fecha o menu
			if (window.innerWidth <= 768) { // Só fecha no mobile
				collapseMenu.classList.remove("open"); // Fecha o menu
			}
		});
	});
});

// Simula o clique no item "Home" ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
	// Seleciona o item de menu com a classe 'active' (presumivelmente o item "Home")
	const homeMenuItem = document.querySelector('.menu-item.active');
	
	// Se o item "Home" existir, simula um clique nele
	if (homeMenuItem) {
		homeMenuItem.click();
	}
});

// Ajusta a altura do cabeçalho e o espaçamento do menu com base na altura da tela
function ajustarHeaderHeight() {
	let alturaTela = window.innerHeight; // Obtém a altura da tela
	
	let root = document.documentElement; // Obtém o elemento raiz (:root no CSS)
	
	// Define o tamanho do cabeçalho com base na altura da tela
	if (alturaTela < 750) {
		root.style.setProperty("--header-height", "100px");
		root.style.setProperty("--menu-header", "20px 0px 20px 0px");
		root.style.setProperty("--menu-item", "8px");
	} else {
		root.style.setProperty("--header-height", "160px");
		root.style.setProperty("--menu-header", "40px 0px 40px 0px");
		root.style.setProperty("--menu-item", "16px");
	}
}

// Chama a função ao carregar a página
ajustarHeaderHeight();

// Adiciona um listener para quando a tela for redimensionada
window.addEventListener("resize", ajustarHeaderHeight);

// Variável para controlar o tema atual
let currentTheme = 'theme1';

// Função para alternar entre Tema 1 e Tema 2
function toggleTheme() {
	const iframe = document.getElementById('contentFrame');
	
	// Links dos Relatórios
	const linkVitimas = document.getElementById('link-vitimas');
	const linkAutores = document.getElementById('link-autores');
	const linkQualificacao = document.getElementById('link-qualificacao');
	const linkProjetoHQH = document.getElementById('link-projeto-hqh');
	
	// Imagens Fixas superiores
	const menuImage = document.getElementById('menu-icon');
	const pdfImage = document.getElementById('pdf');
	const xlsImage = document.getElementById('xls');
	
	// Imagens dos itens de menu
	const homeImage = document.getElementById('home');
	const cadastroImage = document.getElementById('cadastro');
	const editImage = document.getElementById('edit');
	const listImage = document.getElementById('list');
	const investImage = document.getElementById('invest');
	const dashImage = document.getElementById('dash');
	
	if (currentTheme === 'theme1') {
		// Altera os links
		linkVitimas.href = "https://sesp.viya.sesp.es.gov.br/SASVisualAnalytics/?reportUri=%2Freports%2Freports%2F49d984bd-bf6b-4832-b6e4-faa238726356&sectionIndex=1&reportViewOnly=true&reportContextBar=false&pageNavigation=false&sas-welcome=false&appSwitcherDisabled=true";
		linkAutores.href = "https://sesp.viya.sesp.es.gov.br/SASVisualAnalytics/?reportUri=%2Freports%2Freports%2F8a8e5b65-42fb-4614-8f56-0ac0b0d2a711&sectionIndex=1&reportViewOnly=true&reportContextBar=false&pageNavigation=false&sas-welcome=false&appSwitcherDisabled=true";
		linkQualificacao.href = "https://sesp.viya.sesp.es.gov.br/SASVisualAnalytics/?reportUri=%2Freports%2Freports%2Fcb803580-71ca-45e7-ab9c-f7966fcce499&sectionIndex=4&reportViewOnly=true&reportContextBar=false&pageNavigation=false&sas-welcome=false&appSwitcherDisabled=true";
		linkProjetoHQH.href = "https://sesp.viya.sesp.es.gov.br/SASVisualAnalytics/?reportUri=%2Freports%2Freports%2F5ce9983f-db1f-4651-8ce7-460dd58ed53d&sectionIndex=4&reportViewOnly=true&reportContextBar=false&pageNavigation=false&sas-welcome=false&appSwitcherDisabled=true";
		//&appSwitcherDisabled=true
		
		// Muda para o Tema 2
		document.documentElement.style.setProperty('--backgroundv2', 'linear-gradient(90deg, #F36F6E 0%, #F36E9B 100%)');
		document.documentElement.style.setProperty('--background-color', '#FAFAFA');
		document.documentElement.style.setProperty('--background-color-hover', '#FEF1F1');
		document.documentElement.style.setProperty('--background-color-active', 'none');
		document.documentElement.style.setProperty('--text-color', '#373948');
		document.documentElement.style.setProperty('--text-color-sub', '#fff');
		document.documentElement.style.setProperty('--menu-text-color', '#F36F6E');
		document.documentElement.style.setProperty('--border-color', '#011338');
		document.documentElement.style.setProperty('--titulo-color', '#fff');
		document.documentElement.style.setProperty('--text-color-active', '#fff');
		document.documentElement.style.setProperty('--imgbranca', 'brightness(0) invert(1)');
		
		// Altera a imagens
		menuImage.src = '/files/files/186c262c-043d-49a9-b2ae-d12aa1d2362f/content';
		pdfImage.src = '/files/files/7df85977-f7af-4aad-a568-b0ef57e4b87a/content';
		xlsImage.src = '/files/files/48fb4835-f944-4b7f-b86d-818643c1aea2/content';
		
		currentTheme = 'theme2';
	} else {
		// Altera os links
		linkVitimas.href = "https://sesp.viya.sesp.es.gov.br/SASVisualAnalytics/?reportUri=%2Freports%2Freports%2F49d984bd-bf6b-4832-b6e4-faa238726356&sectionIndex=0&reportViewOnly=true&reportContextBar=false&pageNavigation=false&sas-welcome=false&appSwitcherDisabled=true";
		linkAutores.href = "https://sesp.viya.sesp.es.gov.br/SASVisualAnalytics/?reportUri=%2Freports%2Freports%2F8a8e5b65-42fb-4614-8f56-0ac0b0d2a711&sectionIndex=0&reportViewOnly=true&reportContextBar=false&pageNavigation=false&sas-welcome=false&appSwitcherDisabled=true";
		linkQualificacao.href = "https://sesp.viya.sesp.es.gov.br/SASVisualAnalytics/?reportUri=%2Freports%2Freports%2Fcb803580-71ca-45e7-ab9c-f7966fcce499&sectionIndex=3&reportViewOnly=true&reportContextBar=false&pageNavigation=false&sas-welcome=false&appSwitcherDisabled=true";
		linkProjetoHQH.href = "https://sesp.viya.sesp.es.gov.br/SASVisualAnalytics/?reportUri=%2Freports%2Freports%2F5ce9983f-db1f-4651-8ce7-460dd58ed53d&sectionIndex=3&reportViewOnly=true&reportContextBar=false&pageNavigation=false&sas-welcome=false&appSwitcherDisabled=true";
		//&appSwitcherDisabled=true
		
		// Muda para o Tema 1
		document.documentElement.style.setProperty('--backgroundv2', 'none');
		document.documentElement.style.setProperty('--background-color', '#011338');
		document.documentElement.style.setProperty('--background-color-hover', '#11DC92');
		document.documentElement.style.setProperty('--background-color-active', '#11DC92');
		document.documentElement.style.setProperty('--text-color', '#FFF');
		document.documentElement.style.setProperty('--text-color-sub', '#434F68');
		document.documentElement.style.setProperty('--menu-text-color', '#fff');
		document.documentElement.style.setProperty('--border-color', '#11DC92');
		document.documentElement.style.setProperty('--border-sidebar', '#434F68');
		document.documentElement.style.setProperty('--titulo-color', '#11DC92');
		document.documentElement.style.setProperty('--text-color-active', '#fff');
		document.documentElement.style.setProperty('--imgbranca', 'none');
		
		// Restaura a imagem do brasão
		menuImage.src = '/files/files/411b72c6-1457-4f40-8981-481c53a3850e/content';
		pdfImage.src = '/files/files/68212e43-510a-4bf4-b8b1-977076dd87cd/content';
		xlsImage.src = '/files/files/a8558793-ec25-414f-9685-03ced1e07773/content';
		
		currentTheme = 'theme1';
	}
	
	// Envia o tema para o iframe
	sendThemeToIframe();
}

// Envia o tema atual para o iframe
function sendThemeToIframe() {
	let theme = currentTheme; // Obtém o tema atual 
	let iframe = document.getElementById("contentFrame");
	
	// console.log("Enviando tema para o iframe:", theme); // Log antes do envio
	
	// Verifica se o iframe foi encontrado
	if (iframe) {
		iframe.contentWindow.postMessage({ theme: theme }, "*");
		// console.log("Tema enviado com sucesso!"); // Confirmação de envio
	} else {
		// console.log("Erro: Iframe 'contentFrame' não encontrado."); // Log de erro se não encontrar o iframe
	}
}

// Detecta quando o iframe carregar um novo conteúdo
let iframe = document.getElementById("contentFrame");
iframe.addEventListener('load', function() {
	// console.log('Conteúdo do iframe foi carregado');
	sendThemeToIframe(); // Envia o tema atual toda vez que o iframe for carregado
});

// Removendo o header do Investigator
document.getElementById('contentFrame').onload = function () {
	setTimeout(function () {
		const iframe = document.getElementById('contentFrame').contentWindow.document;
		const header = iframe.querySelector('.sas-banner');
		
		if (header) {
			header.style.display = 'none';  // Oculta o header
		}
	}, 5000); // Aguarda 5 segundos antes de executar
};