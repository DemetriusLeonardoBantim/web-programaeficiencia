import Head from 'next/head';
import styles from './style.module.scss'
import {CardTeam} from '../../components/CardTeam'
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client'
import { GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';

type PrismicContent = {
  title:string
  content:string
  slug:string,
  image:string
  cargo:string
}

interface PostProps {
  equipe: PrismicContent[]
}

export default function Equipe({equipe}: PostProps){
  return(
    <>
      <Head>
        <title>Eficiência | Equipe</title>
      </Head>

      <h1 className={styles.titleHeader}>Conheça os integrantes da nossa equipe</h1>
      <CardTeam data={equipe}/>
    </>
  )
}



export const getStaticProps: GetStaticProps = async () =>{
  const prismic = getPrismicClient()
  const response = await prismic.query(
    Prismic.predicates.at('document.type', 'equipe'), {
      fetch: ['equipe.title', 'equipe.description', 'equipe.cargo','equipe.foto'],
      pageSize: 100
    }
  )

  const equipe = response.results.map(equip => {
    return {
      slug: equip.uid,
      title:RichText.asText(equip.data.title),
      cargo:RichText.asText(equip.data.cargo),
      content: RichText.asText(equip.data.description),
      image: equip.data.foto.url
    }
  })

  console.log(equipe)

  return {
    props: {
      equipe
    }
  }
}