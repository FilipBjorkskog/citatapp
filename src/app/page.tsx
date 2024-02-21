import { getData, saveData, updateData, deleteData } from '@/utils/handleDatabase'
import Link from "next/link";
import { revalidateTag } from 'next/cache';


export default async function Home() {
  const data = await getData()
  //create
  const create = async (formData: FormData) => {
    'use server'
    const quote = formData.get("quote") as string
    const author = formData.get("author") as string
    const data = await saveData(quote, author)
    console.log(data)
    revalidateTag("quote")
  }
  //update
  const update = async (formData: FormData) => {
    'use server'
    const quote = formData.get("quote") as string
    const author = formData.get("author") as string
    const id = formData.get("id") as string
    const data = await updateData(id, author, quote)
    console.log(data)
    revalidateTag("quote")
  }
  //delete
  const deleteForm = async (formData: FormData) => {
    'use server'
    const id = formData.get("id") as string
    const data = await deleteData(id)
    console.log(data)
    revalidateTag("quote")
  }
  return (
    <div className="bg-slate-900 min-h-screen w-full text-slate-50 flex justify-center items-center flex-col">
      {/* Form for creating a new quote */}
      <form action={create} className="mt-4 flex">
        <input className="text-slate-500 bg-slate-800 rounded-md px-3 py-2 mr-2" type="text" name="author" placeholder="Author" />
        <input className="text-slate-500 bg-slate-800 rounded-md px-3 py-2 mr-2" type="text" name="quote" placeholder="Quote" />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Quote</button>
      </form>
      {/* Displaying existing quotes */}
      <div className="mt-4">
        {data.map(q => (
          <div key={q.id} className="max-w-60 h-52 w-52 bg-slate-800 rounded-md p-4 mb-4">
            <p className="text-slate-300">ID: {q.id}</p>
            <h1 className="text-lg text-slate-50">Quote: {q.quote}</h1>
            <h3 className="text-slate-300">Author: {q.author}</h3>
            <form action={deleteForm}>
              <input type="hidden" name="id" value={q.id} />
              <button type="submit" className="float-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </form>
            <button className="float-left h-14 w-30 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              <Link href={"/quotes/" + q.id}>Update</Link>
            </button>
            <input type="hidden" name="id" />
          </div>
        ))}
      </div>
    </div>

  )
};