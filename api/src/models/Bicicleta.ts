import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { OrdemServico } from "./OrdemServico";

@Entity('bicicleta')
export class Bicicleta extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public marca: string;

   @Column()
   public modelo: string;
   
   @Column({type: "char", default: 'A'})
   public situacao: string;

   @OneToMany(() => OrdemServico, (ordem_servico) => ordem_servico.bicicleta)
   public ordem_servico: OrdemServico[];
}