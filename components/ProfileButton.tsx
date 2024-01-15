import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";


export default function ProfileButton() {
  return (
    <div className="flex items-center gap-3">
      <Button>Login</Button>
      <Avatar>
        <AvatarImage src="/img/avatar.jpeg" />
      </Avatar>
    </div>
  );
}
