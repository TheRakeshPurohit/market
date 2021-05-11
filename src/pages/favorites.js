import Layout from '@/components/layout/'
import { supabase } from '../helpers/initSupabase'
import Asset from '@/components/Asset'
import Model from '@/components/Model'

const Favorites = ({ favorites }) => {
  return (
    <Layout title={'Your Favorites'}>
      <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {favorites.map((favorite) =>
          favorite.type === 'models' ? (
            <Model {...favorite} key={favorite.info.name} />
          ) : (
            <Asset
              {...{
                ...favorite,
                preview: favorite.image,
                url: favorite.folder,
              }}
              key={favorite.info.name}
            />
          )
        )}
      </ul>
    </Layout>
  )
}

export default Favorites

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
  const { data } = await supabase
    .from('profiles')
    .select('favorites')
    .eq('user_id', user.id)

  const promiseData = data[0].favorites.map(async (favorite) => {
    const [type, name] = favorite.split('/')
    const url = `https://api.market.pmnd.rs/${
      type === 'models' ? 'models/model' : 'materials/material'
    }?name=${name}`
    const data = await fetch(url)
    const asset = await data.json()

    return {
      ...asset,
      type,
    }
  })

  const favorites = await Promise.all(promiseData)

  return { props: { user, favorites } }
}
