import { Box,Image,Badge,SimpleGrid,GridItem } from '@chakra-ui/react'

type PrismicContent = {
  title:string
  content:string
  slug:string,
  image:string
}

interface PostProps {
  data: PrismicContent[]
}


export function BoxRelated({data}: PostProps){

  return(
    <Box display='flex' mt='2' justifyContent='center'>
      <SimpleGrid columns={3} gap={100}>
        {data && data.map((artigo: any) => {
          return (
            <GridItem key={artigo.uid}>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
              <Image src={artigo.image} alt={artigo.uid} />
              <Box p='6'>
                <Box display='flex' alignItems='baseline'>
                  <Badge borderRadius='full' px='2' colorScheme='teal'> 
                    Jornal Nordeste
                  </Badge>
                </Box>
  
                <Box
                  mt='1'
                  fontWeight='semibold'
                  as='h4'
                  lineHeight='tight'
                >
                  {artigo.content}
                </Box>
              </Box>
            </Box>
          </GridItem>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}