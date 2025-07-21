

import styles from "./Contacts.module.css"

import Contact from "./Contact";

function ContactsList({ contactData, isDeleteGroup, setIsModalDelete, setDeletesId, setIsEditContact, setFormContact }) {



    return (
        <div className={styles.container} >
            <div>

                {
                    contactData.loading ?
                        <p className={styles.notContacts}> ... Loading</p>
                        :
                        contactData.data.length ?

                            <>
                                {
                                    contactData.data.map(data =>

                                        <Contact key={data.id} styles={styles} isDeleteGroup={isDeleteGroup}
                                            setIsModalDelete={setIsModalDelete} setDeletesId={setDeletesId}
                                            setIsEditContact={setIsEditContact} setFormContact={setFormContact} data={data}
                                        />
                                    )
                                }
                            </>
                            :

                            contactData.error
                                ?
                                <p className={styles.notContacts}>❗{contactData.error}❗</p>
                                :
                                <p className={styles.notContacts}>❌ هیچ مخاطبی وجود ندارد ❌</p>
                }
            </div>
        </div>
    )
}

export default ContactsList