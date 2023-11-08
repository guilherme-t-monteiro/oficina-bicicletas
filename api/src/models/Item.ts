import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { OrdemServico } from "./OrdemServico";

@Entity('item')
export class Item extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public descricao: string;

   @OneToMany(() => OrdemServico, (ordem_servico) => ordem_servico.bicicleta)
   public ordem_servico: OrdemServico[];

}