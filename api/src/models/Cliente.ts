import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { OrdemServico } from "./OrdemServico";

@Entity('cliente')
export class Cliente extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public nome: string;

   @Column()
   public email: string;
   
   @Column()
   public telefone: string;

   @Column()
   public endereco: string;

   @Column({type: "char", default: 'A'})
   public situacao: string;

   @OneToMany(() => OrdemServico, (ordem_servico) => ordem_servico.cliente)
   public ordem_servico: OrdemServico[];
}