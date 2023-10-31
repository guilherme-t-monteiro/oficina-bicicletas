import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Bicicleta } from "./Bicicleta";
import { Cliente } from "./Cliente";

@Entity('ordem_servico')
export class OrdemServico extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public diagnostico: string;
   
   @Column()
   public solucao: string;

   @Column()
   public preco: number;

   @Column({type: "char", default: 'A'})
   public situacao: string;

   @ManyToOne(() => Bicicleta, (bicicleta) => bicicleta.ordem_servico)
   public bicicleta: Bicicleta;

   @ManyToOne(() => Cliente, (cliente) => cliente.ordem_servico)
   public cliente: Cliente;
}