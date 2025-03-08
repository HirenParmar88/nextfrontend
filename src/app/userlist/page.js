import Link from "next/link";

export default function UserList(){
    return(
       
            <div>
                <h1>User List</h1>
                <ul>
                    <li>
                        <Link href="/userlist/1">hiren</Link>
                    </li>
                    <li>
                    <Link href="/userlist/2">ravi</Link>
                    </li>
                    <li>
                    <Link href="/userlist/3">yshu</Link>
                    </li>
                    <li>
                    <Link href="/userlist/4">raj</Link>
                    </li>
                </ul>
            </div>
 
    )
}