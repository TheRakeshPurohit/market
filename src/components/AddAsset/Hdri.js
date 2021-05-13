import { defaultJSON } from './data'
import Table from './Table'

const AddHdri = () => (
  <>
    <p>
      First create a folder with the name of your HDRI, please do not leave
      spaces between the name, so instead of saying <code>a sunny day</code> you
      should do <code>a-sunny-day</code>
    </p>

    <p className='mt-4'>
      The folder structure will be something like:
      <pre className='p-2 mt-2 bg-gray-100 rounded'>
        <code>
          {`my-hdri/
├─ info.json
├─ thumbnail.(png|jpg)
├─ your-file.hdr`}
        </code>
      </pre>
    </p>
    <p className='mt-4'>
      Here are the fields in the <code>info.json</code>:
    </p>
    <Table data={defaultJSON} />
    <p className='mt-6'>
      To create a render a resolution of 420*320px is enough and you can find
      the starter blender file we used in most of our shots{' '}
      <a
        href='https://github.com/pmndrs/market-assets/blob/main/starter.blend'
        target='_blank'
        rel='noreferrer'
      >
        in the repo
      </a>
      , please all feel free to create your own renders.
    </p>
  </>
)

export default AddHdri