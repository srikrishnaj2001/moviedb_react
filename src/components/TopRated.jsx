import {
  Heading,
  Image,
  SimpleGrid,
  Flex,
  Button,
  Badge,
  Divider,
  Kbd,
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'

export default function TopRated() {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  async function getMoviesFromAPI() {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
    )
    const data = await res.json()
    console.log(data.results)
    setMovies([...movies, ...data.results])
  }

  useEffect(() => {
    getMoviesFromAPI()
  }, [currentPage])

  return (
    <div>
      <br></br>
      <Flex
        direction='column'
        maxWidth='container.lg'
        mx='auto'
        justify='center'
        align='center'
      >
        <SimpleGrid columns={3} spacing={10}>
          {movies.map((movieinfo) => {
            return (
              <Flex
                direction='column'
                shadow='xl'
                _hover={{ shadow: '2xl' }}
                // border='1px solid'
                // borderColor='gray.400'
                rounded='lg'
                key={movieinfo.id}
              >
                <Image
                  src={
                    movieinfo.backdrop_path !== null
                      ? `http://image.tmdb.org/t/p/w500/${movieinfo.backdrop_path}`
                      : '/placeholder.png'
                  }
                  fallbackSrc='/placeholder.png'
                  alt={movieinfo.title}
                  objectFit='cover'
                />
                <Flex justify='space-between' p={4} align='center'>
                  <Flex
                    direction='column'
                    align='start'
                    experimental_spaceY={2}
                  >
                    <Heading size='md'>{movieinfo.title}</Heading>
                    <Badge colorScheme='purple'>
                      {movieinfo.original_language}
                    </Badge>
                  </Flex>
                  <p>{movieinfo.vote_average}*</p>
                </Flex>
              </Flex>
            )
          })}
        </SimpleGrid>
        <Button
          colorScheme='blue'
          margin={5}
          onClick={() => {
            setCurrentPage(currentPage + 1)
          }}
        >
          Load More
        </Button>
      </Flex>
    </div>
  )
}