export type CarProps = {
    id: number;
    model: string | null;
    year: number | null;
    usuario_id: number | null;
};

export class Car {
    private constructor(private props: CarProps) {}

    public static create(model: string | null, year: number | null, usuario_id: number | null) {
        return new Car({
            id: 0, // o ID será gerado automaticamente pelo banco de dados
            model,
            year,
            usuario_id,
        });
    }

    public static with(props: CarProps) {
        return new Car(props);
    }

    public get id() {
        return this.props.id;
    }

    public get model() {
        return this.props.model;
    }

    public get year() {
        return this.props.year;
    }

    public get usuario_id() {
        return this.props.usuario_id;
    }

    public updateModel(model: string | null) {
        this.props.model = model;
    }

    public updateYear(year: number | null) {
        this.props.year = year;
    }

    public updateUsuarioId(usuario_id: number | null) {
        this.props.usuario_id = usuario_id;
    }
}
