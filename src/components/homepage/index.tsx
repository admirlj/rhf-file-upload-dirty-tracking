import { useFieldArray, useForm, useWatch } from 'react-hook-form'

interface Card {
    id:string;
  title: string;
  image: FileList | null | {url: string, alt: string};
}

interface FormValues {
  title: string;
  cards: Card[];
}

function Homepage() {

    const { control, register, handleSubmit, getFieldState, getValues, formState, reset } = useForm<FormValues>({
        defaultValues: {
            title: '',
            cards: [
                {
                    id:'68c160daf366522beed3ff98',
                    title: 'Example one',
                    image: {
                        url: "ur;/sada/",
                        alt: 'alternative text'
                    }
                },
                {
                    id: '68c160daf366522beed3ff99',
                    title: 'Example twp',
                    image: {
                        url: "ur;/sasasdasdasdasd/",
                        alt: 'alternative text second'
                    }
                }
            ]
        }
    });

   const {fields} =  useFieldArray({
        control: control,
        name: 'cards'
    })


    const onSubmit = (data: FormValues) => {
        console.log('Sending only',{title: data.title})
    }

    const handleCardSubmit = async (cardIndex: number) => {
        const {id} = getValues().cards[cardIndex];

        const formdata = new FormData();


        for( const [key, value] of Object.entries(getValues().cards[cardIndex])){
            if(value instanceof FileList){
                console.log(1)
                formdata.set(key, value[0])
                continue
            }

            if(key === 'image') continue
             console.log(2, key)
            formdata.set(key,value)

        }

        try{
           const res =  await fetch(`${import.meta.env.REACT_APP_API_URL}/api/data/home/card/${id}`,{
                method: 'PUT',
                body: formdata,
                headers: {
                    'contentType':'application/json',
                    'authorization':`Bearer ${import.meta.env.REACT_APP_BEARER}`
                }
            })

            if(!res.ok){
                const error = await res.json();
                throw new Error(error?.message)
            }
            const data =  await res.json()
            console.log('res 2',data)

            reset()
        }catch(error){
                 console.log(error )
        }

    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' >
            <div>
                <label htmlFor='tile' >Title</label>
                <input id='title' {...register('title')} ></input>
            </div>
            <ul>
                {fields.map((field, index) => {

                   const {isDirty: isTitleDirty} = getFieldState(`cards.${index}.title`,formState)
                   const {isDirty: isImageDirty} = getFieldState(`cards.${index}.image.url`,formState)

                    const isDisabled = isTitleDirty === false && isImageDirty === false;

                    return (
                        <li key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                            <>
                                <input {...register(`cards.${index}.id`)} type='hidden' value={field.id} ></input>
                                <input {...register(`cards.${index}.title`)} ></input>
                                <input {...register(`cards.${index}.image`)} type='file' ></input>
                                <button disabled={isDisabled} onClick={() => handleCardSubmit(index)} type='button'> Save card {index} </button>
                            </>
                        </li>
                    )
                }
                )}
            </ul>
            <button>Submit</button>
        </form>
    )
}

export default Homepage