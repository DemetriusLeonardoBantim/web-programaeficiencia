import { Box,Image,Badge,SimpleGrid,GridItem } from '@chakra-ui/react'


type PrismicContent = {
  title:string
  content:string
  slug:string,
  image:string
  cargo:string
}

interface PostProps {
  data: PrismicContent[]
}


export function CardTeam({data}:PostProps){

  return(
    <Box display='flex' mt='2' justifyContent='center'>
      <SimpleGrid columns={3} gap={100}>
      {data && data.map((equip) =>{
        return (
          <GridItem key={equip.slug} >
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Image src={equip.image} alt={equip.slug} />
          <Box p='6'>
            <Box display='flex' alignItems='baseline'>
              <Badge borderRadius='full' px='2' colorScheme='teal'> 
                {equip.cargo}
              </Badge>
            </Box>

            <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
            >
              {equip.title}
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