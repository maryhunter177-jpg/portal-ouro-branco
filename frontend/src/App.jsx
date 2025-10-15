import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, Package, Lock, User, Home as HomeIcon, LogIn, ShoppingCart, Phone, Eye, EyeOff } from 'lucide-react';

// URL base para o backend (ajuste se a porta mudar)
const API_BASE_URL = 'http://localhost:3000/api';

// --- COMPONENTES DA PÁGINA ---

/**
 * Componente de Cabeçalho (Navbar)
 */
const Header = ({ currentPage, setCurrentPage, isLoggedIn, handleLogout }) => {
    // Retorna a cor do texto baseada na página ativa
    const getLinkClass = (page) =>
        `text-white text-sm font-medium p-2 rounded-lg transition duration-300 ${
            currentPage === page ? 'bg-yellow-600' : 'hover:bg-yellow-700'
        }`;

    return (
        <header className="bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-yellow-500 tracking-wider">
                        Portal Ouro Branco
                    </span>
                    <nav className="hidden md:flex space-x-4">
                        <button onClick={() => setCurrentPage('home')} className={getLinkClass('home')}>
                            <HomeIcon className="w-4 h-4 inline mr-1" /> Início
                        </button>
                        {/* O Catálogo agora é acessível mesmo deslogado */}
                        <button onClick={() => setCurrentPage('catalogo')} className={getLinkClass('catalogo')}>
                            <Package className="w-4 h-4 inline mr-1" /> Catálogo
                        </button>
                    </nav>
                </div>
                <div className="flex items-center space-x-2">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
                            >
                                <Lock className="w-4 h-4 mr-2" /> Sair
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setCurrentPage('login')}
                            className="flex items-center px-4 py-2 bg-yellow-500 text-gray-900 text-sm font-semibold rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md"
                        >
                            <LogIn className="w-4 h-4 mr-2" /> Acesso
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

/**
 * Componente de Rodapé (Footer)
 */
const Footer = () => {
    return (
        <footer className="bg-gray-900 shadow-inner mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center">
                
                <p className="text-sm text-gray-400 mb-2 md:mb-0">
                    &copy; {new Date().getFullYear()} Ouro Branco. Todos os direitos reservados.
                </p>

                {/* Botão de Contato */}
                <button
                    className="flex items-center px-6 py-2 bg-yellow-500 text-gray-900 text-md font-bold rounded-full hover:bg-yellow-600 transition duration-300 shadow-md transform hover:scale-[1.02]"
                    // Ação de clique vazia, pois a funcionalidade será adicionada depois
                    onClick={() => console.log('Botão de Contato Clicado (Implementar funcionalidade)')} 
                >
                    <Phone className="w-5 h-5 mr-2" /> Fale Conosco
                </button>
            </div>
        </footer>
    );
};


/**
 * Componente da Página Inicial (Home)
 */
const HomePage = ({ setCurrentPage }) => (
    <div className="flex flex-col items-center justify-center min-h-screen-minus-header bg-gray-100 p-4">
        <div className="max-w-4xl w-full text-center">
            
            {/* Bloco de Boas-Vindas */}
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border-t-4 border-yellow-500 mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                    Bem-vindo ao <span className="text-yellow-600">Portal do Revendedor Ouro Branco</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Seu acesso exclusivo ao catálogo de produtos em tempo real. Consulte preços, estoque e códigos com agilidade e garanta as melhores ofertas para seus clientes.
                </p>
                <button
                    onClick={() => setCurrentPage('catalogo')}
                    className="flex items-center justify-center mx-auto px-8 py-3 bg-yellow-500 text-gray-900 text-lg font-bold rounded-lg hover:bg-yellow-600 transition duration-300 shadow-xl transform hover:scale-105"
                >
                    <ShoppingCart className="w-6 h-6 mr-3" /> Ver Catálogo
                </button>
            </div>

            {/* Cards de Destaque / Dicas */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Card 1: Seu Cadastro */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
                    <User className="w-8 h-8 text-yellow-600 mb-3" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Seu Cadastro</h2>
                    <p className="text-gray-600 text-sm">
                        Mantenha seu cadastro atualizado para receber comunicações exclusivas e ofertas especiais. Use seu CNPJ para login.
                    </p>
                </div>
                
                {/* Card 2: Acesso Restrito ao Preço */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
                    <EyeOff className="w-8 h-8 text-yellow-600 mb-3" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Acesso Restrito ao Preço</h2>
                    <p className="text-gray-600 text-sm">
                        O preço de custo só é liberado após o login. <button onClick={() => setCurrentPage('login')} className="text-yellow-600 hover:text-yellow-700 font-semibold underline">Clique aqui para logar</button> e ver o valor.
                    </p>
                </div>
            </div>
        </div>
    </div>
);


/**
 * Componente do Formulário de Cadastro (Register)
 * ALTERADO: Substituído o campo 'email' por 'cnpj'.
 */
const RegisterPage = ({ setCurrentPage, showNotification }) => {
    
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        cnpj: '', // <-- Novo campo CNPJ
        senha: '',
        confirmarSenha: '',
    });

    // Função auxiliar para aplicar máscara de CNPJ se necessário (não implementada aqui, apenas como sugestão)
    const formatCnpj = (value) => {
        // Remove tudo que não for dígito
        return value.replace(/\D/g, ''); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'cnpj') {
            newValue = formatCnpj(value);
        }

        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.senha !== formData.confirmarSenha) {
            showNotification('As senhas não coincidem!', 'error');
            return;
        }

        // Validação básica do CNPJ (14 dígitos)
        if (formData.cnpj.length !== 14) {
             showNotification('O CNPJ deve ter 14 dígitos.', 'error');
            return;
        }
        
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {
                cnpj: formData.cnpj, // <-- Envia CNPJ
                password: formData.senha,
            });
            
            if (response.status === 201) {
                showNotification('Cadastro realizado com sucesso! Faça o Login.', 'success');
                setCurrentPage('login');
            }
        } catch (error) {
            showNotification('Erro de conexão ou CNPJ já cadastrado.', 'error');
            console.error('Erro de Registro:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen-minus-header p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border-t-4 border-yellow-500">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                    <User className="w-6 h-6 text-yellow-600 mr-2" /> Cadastro Revendedor
                </h1>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome Completo / Razão Social"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="tel" // Alterado para tel para melhor UX em mobile, mesmo que receba a máscara
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="text" // Input para CNPJ
                    name="cnpj"
                    placeholder="CNPJ (Somente números)"
                    value={formData.cnpj}
                    onChange={handleChange}
                    required
                    maxLength={14}
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="password"
                    name="confirmarSenha"
                    placeholder="Confirmar Senha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                    type="submit"
                    className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md"
                >
                    Registrar Revendedor
                </button>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Já tem conta? <button type="button" onClick={() => setCurrentPage('login')} className="text-yellow-600 hover:text-yellow-700 font-semibold">Faça Login</button>
                </p>
            </form>
        </div>
    );
};


/**
 * Componente do Formulário de Login (Login)
 * ALTERADO: Substituído o campo 'email' por 'cnpj'.
 */
const LoginPage = ({ setCurrentPage, showNotification, setIsLoggedIn }) => {
    
    const [cnpj, setCnpj] = useState(''); // <-- Estado para CNPJ
    const [password, setPassword] = useState('');

    // Função auxiliar para formatar CNPJ
    const formatCnpj = (value) => {
        // Remove tudo que não for dígito
        return value.replace(/\D/g, ''); 
    };

    const handleCnpjChange = (e) => {
        const rawCnpj = formatCnpj(e.target.value);
        setCnpj(rawCnpj);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação básica do CNPJ (14 dígitos)
        if (cnpj.length !== 14) {
             showNotification('O CNPJ deve ter 14 dígitos.', 'error');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { cnpj, password }); // <-- Envia CNPJ
            
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                showNotification('Login realizado com sucesso!', 'success');
                setIsLoggedIn(true);
                setCurrentPage('catalogo');
            }
        } catch (error) {
            // Em um ambiente real, o backend retornaria uma mensagem de erro mais específica.
            showNotification('Credenciais inválidas ou erro de conexão.', 'error');
            console.error('Erro de Login:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen-minus-header p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl border-t-4 border-yellow-500">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-yellow-600 mr-2" /> Acesso de Revendedor
                </h1>
                <input
                    type="text" // Input para CNPJ
                    placeholder="CNPJ (Somente números)"
                    value={cnpj}
                    onChange={handleCnpjChange}
                    required
                    maxLength={14}
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                    type="submit"
                    className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md"
                >
                    Entrar no Portal
                </button>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Não é revendedor? <button type="button" onClick={() => setCurrentPage('register')} className="text-yellow-600 hover:text-yellow-700 font-semibold">Cadastre-se aqui</button>
                </p>
            </form>
        </div>
    );
};


/**
 * Componente da Página do Catálogo (Agora público, mas com preço restrito)
 * ALTERADO: Adicionado filtro de marca como abas.
 */
const CatalogoPage = ({ showNotification, isLoggedIn }) => {
    const [produtos, setProdutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    // NOVO ESTADO: Armazena a marca selecionada para o filtro (default: 'Todos')
    const [selectedBrand, setSelectedBrand] = useState('Todos'); 
    // NOVO ESTADO: Armazena as marcas únicas encontradas nos produtos
    const [availableBrands, setAvailableBrands] = useState([]);

    // Modificado para NÃO exigir token no cabeçalho. O backend deve ser ajustado para retornar
    // o catálogo para todos, mas só o preço para quem tem token válido.
    const fetchProdutos = useCallback(async () => {
        setIsLoading(true);
        // O token é obtido, mas o request GET de produtos não o exige mais para a listagem
        const token = localStorage.getItem('token'); 
        
        try {
            const response = await axios.get(`${API_BASE_URL}/produtos`, {
                // A única diferença no GET é a presença do token.
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const fetchedProducts = response.data;
            setProdutos(fetchedProducts);

            // 1. Calcular marcas únicas e atualizar o estado
            const brands = [...new Set(fetchedProducts.map(p => p.marca))];
            setAvailableBrands(brands.sort()); // Ordena alfabeticamente
            
            setIsLoading(false);
        } catch (error) {
            // Em caso de erro de backend, ainda exibimos um aviso, mas mantemos o layout.
            showNotification('Erro ao buscar produtos. Verifique a API.', 'error');
            console.error('Erro ao buscar produtos:', error);
            setProdutos([]); 
            setAvailableBrands([]);
            setIsLoading(false);
        }
    }, [showNotification]);

    useEffect(() => {
        // Agora, o catálogo é carregado independentemente do estado de login
        fetchProdutos();
    }, [fetchProdutos]);
    
    // Lógica de Filtragem (Case-insensitive)
    const produtosFiltrados = produtos.filter(produto => {
        // Filtro 1: Busca por termo (nome, código ou marca)
        const matchesSearch = (
            produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            produto.marca.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Filtro 2: Marca Selecionada
        const matchesBrand = (
            selectedBrand === 'Todos' ||
            produto.marca === selectedBrand
        );

        return matchesSearch && matchesBrand;
    });

    // Função para renderizar os botões de filtro (tabs)
    const renderBrandTabs = () => {
        const brands = ['Todos', ...availableBrands];
        
        return (
            <div className="flex flex-wrap gap-2 mb-6 p-2 bg-white rounded-xl shadow-inner border border-gray-100">
                {brands.map(brand => (
                    <button
                        key={brand}
                        onClick={() => {
                            setSelectedBrand(brand);
                            setSearchTerm(''); // Limpa a busca ao mudar de aba (melhora a UX)
                        }}
                        className={`
                            px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ease-in-out
                            ${selectedBrand === brand 
                                ? 'bg-yellow-500 text-gray-900 shadow-md transform scale-105' 
                                : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                            }
                        `}
                    >
                        {brand}
                    </button>
                ))}
            </div>
        );
    };


    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Catálogo de Produtos</h1>
            
            {/* NOVO: Filtro de Marcas (Tabs) */}
            {!isLoading && availableBrands.length > 0 && renderBrandTabs()}

            <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, código ou marca..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                    />
                </div>
                {/* Indicador visual de acesso */}
                <div className="flex items-center text-sm font-medium p-2 rounded-lg bg-gray-100 border border-gray-300">
                    {isLoggedIn ? (
                        <>
                            <Eye className="w-5 h-5 text-green-600 mr-2" />
                            <span className="text-gray-700">Acesso total ao preço</span>
                        </>
                    ) : (
                        <>
                            <EyeOff className="w-5 h-5 text-red-600 mr-2" />
                            <span className="text-gray-700">Preços restritos (Faça Login)</span>
                        </>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-10 text-lg text-gray-500">
                    <svg className="animate-spin h-8 w-8 text-yellow-500 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Carregando dados da API...
                </div>
            ) : produtosFiltrados.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl shadow-lg">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-lg text-gray-600">Nenhum produto encontrado com o termo "{searchTerm}" na marca "{selectedBrand}".</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {produtosFiltrados.map(produto => (
                        <div key={produto.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
                            <div className="flex justify-between items-start mb-3">
                                <h2 className="text-xl font-semibold text-gray-800">{produto.nome}</h2>
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                    produto.marca.toLowerCase() === 'amd' ? 'bg-red-100 text-red-800' :
                                    produto.marca.toLowerCase() === 'crucial' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {produto.marca}
                                </span>
                            </div>

                            {/* Lógica de Exibição de Preço com base no login */}
                            <div className="mb-4 flex items-center space-x-3">
                                {isLoggedIn ? (
                                    <>
                                        {/* Preço Visível (Olho Aberto Implícito) */}
                                        <p className="text-3xl font-extrabold text-yellow-600">
                                            R$ {produto.preco_base ? produto.preco_base.toFixed(2).replace('.', ',') : 'N/A'}
                                        </p>
                                        <Eye className="w-6 h-6 text-green-500" />
                                    </>
                                ) : (
                                    <>
                                        {/* Preço Restrito (Agora com R$ -----) */}
                                        <p className="text-3xl font-extrabold text-gray-500 tracking-wider">
                                            R$ -----
                                        </p>
                                        <EyeOff className="w-6 h-6 text-red-500" />
                                    </>
                                )}
                            </div>
                            
                            <div className="space-y-1 text-sm text-gray-600">
                                <p>Código: **{produto.codigo}**</p>
                                <p>Estoque: **{produto.estoque} unidades**</p>
                            </div>
                            <button className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition duration-300">
                                Ver Detalhes (Em breve)
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


/**
 * Componente Principal da Aplicação
 */
const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [notification, setNotification] = useState(null);

    // Ajusta a altura mínima para o conteúdo, excluindo o header e footer
    useEffect(() => {
        document.body.style.minHeight = '100vh';
        document.documentElement.style.minHeight = '100vh';
    }, []);

    // Função para mostrar notificações (o pop-up vermelho/verde)
    const showNotification = useCallback((message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000); // 4 segundos
    }, []);

    // Handler de Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentPage('catalogo'); // Manda para o catálogo público
        showNotification('Você saiu do portal.', 'success');
    };

    // Redirecionamento baseado no estado de login
    useEffect(() => {
        // Novo comportamento: Se estiver logado e tentar acessar login/cadastro, vai para o catálogo
        if ((currentPage === 'login' || currentPage === 'register') && isLoggedIn) {
              setCurrentPage('catalogo');
        }

        // Se o usuário desloga, a flag isLoggedIn muda e o catálogo recarrega (via useEffect do CatalogoPage)
        
    }, [currentPage, isLoggedIn, showNotification]);


    // Renderização do conteúdo principal
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'login':
                return <LoginPage setCurrentPage={setCurrentPage} showNotification={showNotification} setIsLoggedIn={setIsLoggedIn} />;
            case 'register':
                return <RegisterPage setCurrentPage={setCurrentPage} showNotification={showNotification} />;
            case 'catalogo':
                // O catálogo é sempre acessível
                return <CatalogoPage showNotification={showNotification} isLoggedIn={isLoggedIn} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <style jsx="true">{`
                /* Classe de utilidade para dar um espaçamento entre o header e o footer */
                .min-h-screen-minus-header {
                    min-height: calc(100vh - 120px); /* Ajustado para compensar a altura do Header e do Footer */
                }
            `}</style>

            <Header 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                isLoggedIn={isLoggedIn} 
                handleLogout={handleLogout} 
            />
            
            <main className="flex-grow">
                {renderPage()}
            </main>

            <Footer />

            {/* Componente de Notificação Flutuante */}
            {notification && (
                <div
                    className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-xl text-white font-semibold transition-opacity duration-300 ${
                        notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}
                    style={{ zIndex: 100 }} // Garante que a notificação fique acima de tudo
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default App;