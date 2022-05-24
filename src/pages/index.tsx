import Head from 'next/head';
import {useEffect} from 'react'
import { Carousel } from 'react-responsive-carousel';
import styles from './home.module.scss';
import {BoxRelated} from '../components/BoxRelated'
import { Box,Image,Badge } from '@chakra-ui/react'
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';

type PrismicContent = {
  title:string
  content:string
  slug:string,
  image:string
}


interface PostProps {
  noticias: PrismicContent[]
  artigos: PrismicContent[]
}

const Home = ({artigos,noticias}: PostProps) => {
  console.log(noticias)
  return (
    <div>
      <Head>
        <title>Eficiência | Home</title>
      </Head> 
      <Carousel dynamicHeight={true}  >
      {
          artigos.map((artigo) => {
            return(
              <Box key={artigo.slug}>
                <Image src={artigo.image} className={styles.teste} />
                <p className="legend">
                  {artigo.title}
                </p>
              </Box>
            )
          })
        }
      </Carousel> 
      <div >
        <h1 className={styles.containerRelated}>Notícias relacionadas ao nosso projeto</h1>
        <BoxRelated data={noticias} />
      </div>
    </div>
  )
}

export default Home


export const getStaticProps: GetStaticProps = async () =>{
  const prismic = getPrismicClient()
  const response = await prismic.query(
    Prismic.predicates.at('document.type', 'artigo'), {
      fetch: ['artigo.title', 'artigo.image', 'artigo.content'],
      pageSize: 100
    }
  )
  const responseNoticia = await prismic.query(
    Prismic.predicates.at('document.type', 'noticias'), {
      fetch: ['noticias.title', 'noticias.content', 'noticias.imagem_noticia'],
      pageSize: 100
    }
  )

    const artigos = response.results.map(artigo => {
      return {
        slug: artigo.uid,
        title:RichText.asText(artigo.data.title),
        content: RichText.asText(artigo.data.content),
        image: artigo.data.image.url
      }
    })

    const noticias = responseNoticia.results.map(noticia => {
      console.log(noticia)
      return {
        slug: noticia.uid,
        title:RichText.asText(noticia.data.title),
        content: RichText.asText(noticia.data.content),
        image: noticia.data.imagem_noticia.url
      }
    })


  return {
    props: {
      artigos,
      noticias
    }
  }
}