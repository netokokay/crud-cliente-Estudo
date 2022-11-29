import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('clientes')
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', unique: true})
    usuario: string

    @Column({type: 'text'})
    senha: string

    @Column({ type: "int"})
    idade: number

    @Column("boolean", {default:true} )
    status: Boolean

}