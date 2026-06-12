import { UsurioMockup, CursosMockup, type Curso, type Usuario } from "./mockup";
import router from '@/config/routes'

const MOCKED = router.root === '#';

async function request(path:string, options : {
    method?: string,
    body?: any
} = { method: "GET" }){
    const url = `${ router.root }${ path }`;
    return await fetch( url, options ).then( async (res) => await res.json() ).catch( err => { error: err.message });
}

export async function getSession() : Promise< any >{
    try {
        throw new Error("TODO");
        return {
            "authorization": "JWT TOKEN AQUI"
        }
    } catch (error) {
        return UsurioMockup[0]
    }
}

export async function CreateUser({ nome, email, senha, nascimento } : Usuario ) : Promise<Usuario | any>{
    try {
        const result = await request( router["criar-usuario"]() , {
            method: "POST",
            body: {
                nome,
                email,
                senha,
                nascimento
            }
        });

        if( result.error ){
            throw new Error( result.error );
        }

        return result
    } catch (error) {
        if(MOCKED){
            return UsurioMockup[0]
        }else{
            return {
                statusCode: 400,
                mensagem: "Erro ao criar usuário"
            }
        }
    }
}

export async function Login({ email, senha } : { email: string, senha : string }){
    try {
        const result = await request( router["login"]() , {
            method: "POST",
            body: { email, senha }
        });

        if( result.error ){
            throw new Error( result.error );
        }

        return result
    } catch (error) {
        if(MOCKED){
            return UsurioMockup[0]
        }else{
            return {
                statusCode: 400,
                mensagem: "Erro ao fazer login"
            }
        }
    }
}

export async function ListarCursos({ filtro } : { filtro?: string }){
    try{
        if(MOCKED){
            return CursosMockup;
        }

        const result = await request( router["listar-cursos"]( filtro ));

        if( result.error ){
            throw new Error( result.error );
        }

        return result
    } catch (error) {
        return CursosMockup;
    }
}

export async function Inscricao({ idCurso } : { idCurso : string }){
    try{
        if(MOCKED){
            return { mensagem: "Inscrição realizada com sucesso." };
        }

        const result = await request( router["inscrever-curso"]( idCurso ), { method: "POST" });

        if( result.status_code == 404 ){
            return { error: "Curso não existe." };
        }else if( result.status_code == 403 ){
            return { error: "Usuário precisa estar logado para se inscrever." };
        }else if( result.status_code != 200 ){
            return { error: result?.mensagem };
        }

        return result;
    } catch (error) {
        return { error: "Erro ao realizar inscrição." };
    }
}

export async function Cancelar({ idCurso } : { idCurso : string }){
    try{
        if(MOCKED){
            return { mensagem: "Inscrição cancelada com sucesso." };
        }

        const result = await request( router["cancelar-curso"]( idCurso ), { method: "DELETE" });

        if( result.status_code == 404 ){
            return { error: "Curso não existe." };
        }else if( result.status_code == 403 ){
            return { error: "Usuário precisa estar logado para cancelar inscrição." };
        }else if( result.status_code != 200 ){
            return { error: result?.mensagem };
        }

        return result;
    } catch (error) {
        return { error: "Erro ao cancelar inscrição." };
    }
}

export async function MeusCursos({ idUsuario }:{ idUsuario : string }){
    try{
        if(MOCKED){
            return CursosMockup.filter( c => c.inscrito );
        }

        const result = await request( router["meus-cursos"]( idUsuario ));

        if( result.status_code == 403 ){
            return { error: "Usuário só pode ver os próprios cursos." };
        }

        return result;
    } catch (error) {
        return CursosMockup.filter( c => c.inscrito );
    }
}
