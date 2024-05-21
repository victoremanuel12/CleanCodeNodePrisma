export type UsuarioProps = {
    id?: number;  // Tornar opcional, pois será gerado automaticamente pelo banco de dados
    nome: string | null;
    email: string | null;
};

export class User {
    private constructor(private props: UsuarioProps) {}

    public static create(nome: string , email: string) {
        
        return new User({
            nome,
            email,
        });
    }

    public static with(props: UsuarioProps) {
        return new User(props);
    }

    public get id() {
        return this.props.id;
    }

    public get nome() {
        return this.props.nome;
    }

    public get email() {
        return this.props.email;
    }

    public updateNome(nome: string | null) {
        this.props.nome = nome;
    }

    public updateEmail(email: string | null) {
        this.props.email = email;
    }
}
